use quote::quote;
use serde::{Deserialize, Serialize};
use std::path::Path;
use std::{
    env,
    fs::{self, File},
    io::Write,
};
use swc_common::{sync::Lrc, SourceMap};
use swc_ecma_ast::Program;
use swc_ecma_codegen::{text_writer::JsWriter, Emitter};
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax, TsConfig};

mod ic;

#[derive(Debug, Serialize, Deserialize)]
struct CompilerInfo {
    file_names: Vec<String>,
}

fn main() -> Result<(), String> {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        let executable_name = &args[0];

        return Err(format!(
            "Usage: {executable_name} <path/to/compiler_info.json> [env_vars_csv]"
        ));
    }

    let compiler_info = get_compiler_info(&args[1])?;

    let programs = compiler_info
        .file_names
        .iter()
        .map(|file_name| {
            let filepath = Path::new(&file_name).to_path_buf();

            let cm: Lrc<SourceMap> = Default::default();

            let fm = cm.load_file(&filepath).map_err(|err| err.to_string())?;

            let lexer = Lexer::new(
                Syntax::Typescript(TsConfig {
                    decorators: true,
                    ..TsConfig::default()
                }),
                Default::default(),
                StringInput::from(&*fm),
                None,
            );

            let mut parser = Parser::new_from(lexer);

            let parse_result = parser.parse_program();

            let program = parse_result.map_err(|err| format!("{:#?}", err))?;

            Ok(program)
        })
        .collect::<Result<Vec<Program>, String>>()?;

    let ic = ic::generate();

    let lib_file = quote! {
        use quickjs_wasm_rs::{JSContextRef, JSValueRef, JSValue, to_qjs_value, CallbackArg};
        use std::convert::TryFrom;
        use std::cell::RefCell;
        use std::convert::TryInto;

        const MAIN_JS: &[u8] = include_bytes!("main.js");

        thread_local! {
            static CONTEXT: RefCell<Option<JSContextRef>> = RefCell::new(None);
        }

        #[ic_cdk_macros::init]
        fn init() {
            unsafe { ic_wasi_polyfill::init(&[], &[]); }

            let context = JSContextRef::default();

            #ic

            context.eval_global("exports.js", "globalThis.exports = {};").unwrap();
            context.eval_global("main.js", std::str::from_utf8(MAIN_JS).unwrap()).unwrap();

            CONTEXT.with(|ctx| {
                let mut ctx = ctx.borrow_mut();
                *ctx = Some(context);
            });
        }

        #[ic_cdk_macros::post_upgrade]
        fn post_upgrade() {
            unsafe { ic_wasi_polyfill::init(&[], &[]); }

            let context = JSContextRef::default();

            #ic

            context.eval_global("exports.js", "globalThis.exports = {}").unwrap();
            context.eval_global("main.js", std::str::from_utf8(MAIN_JS).unwrap()).unwrap();

            CONTEXT.with(|ctx| {
                let mut ctx = ctx.borrow_mut();
                *ctx = Some(context);
            });
        }

        #[ic_cdk_macros::query(manual_reply = true)]
        fn test() {
            execute_js("test");
        }

        #[ic_cdk_macros::query(manual_reply = true)]
        fn simpleQuery() {
            execute_js("simpleQuery");
        }

        #[ic_cdk_macros::query(manual_reply = true)]
        fn echoRecord() {
            execute_js("echoRecord");
        }

        #[ic_cdk_macros::query(manual_reply = true)]
        fn echoVariant() {
            execute_js("echoVariant");
        }

        fn execute_js(function_name: &str) {
            CONTEXT.with(|context| {
                let mut context = context.borrow_mut();
                let context = context.as_mut().unwrap();

                let global = context.global_object().unwrap();
                let exports = global.get_property("exports").unwrap();
                let class = exports.get_property("canisterClass").unwrap();
                let method = class.get_property(function_name).unwrap();

                let candid_args = ic_cdk::api::call::arg_data_raw();

                let candid_args_js_value: JSValue = candid_args.into();
                let candid_args_js_value_ref = to_qjs_value(&context, &candid_args_js_value).unwrap();

                // TODO I am not sure what the first parameter to call is supposed to be
                let result = method.call(&method, &[candid_args_js_value_ref]).unwrap();

                ic_cdk::api::call::reply_raw(result.as_bytes().unwrap());
            });
        }
    }
    .to_string();

    let syntax_tree = syn::parse_file(&lib_file).map_err(|err| err.to_string())?;
    let formatted = prettyplease::unparse(&syntax_tree);

    let mut f = File::create("../src/lib.rs").map_err(|err| err.to_string())?;
    f.write_all(formatted.as_bytes())
        .map_err(|err| err.to_string())?;

    Ok(())
}

fn get_compiler_info(compiler_info_path: &str) -> Result<CompilerInfo, String> {
    let compiler_info_string = fs::read_to_string(compiler_info_path)
        .map_err(|err| format!("Error reading {compiler_info_path}: {err}"))?;
    let compiler_info: CompilerInfo = serde_json::from_str(&compiler_info_string)
        .map_err(|err| format!("Error parsing {compiler_info_path}: {err}"))?;

    Ok(compiler_info)
}
