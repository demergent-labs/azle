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
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax, TsConfig};
use crate::traits::to_ident::ToIdent;

mod canister_methods;
mod ic;
mod traits;

#[derive(Debug, Serialize, Deserialize)]
struct CompilerInfo {
    file_names: Vec<String>,
    ts_root: String,
    canister_methods: CanisterMethods
}

#[derive(Debug, Serialize, Deserialize)]
struct CanisterMethods {
    queries: Vec<CanisterMethod>,
    updates: Vec<CanisterMethod>,
    init: Option<CanisterMethod>,
    pre_upgrade: Option<CanisterMethod>,
    post_upgrade: Option<CanisterMethod>,
    heartbeat: Option<CanisterMethod>,
    inspect_message: Option<CanisterMethod>
}

#[derive(Debug, Serialize, Deserialize)]
struct CanisterMethod {
    name: String
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

    let entry_point_file_name = compiler_info.ts_root;

    let programs = compiler_info
        .file_names
        .into_iter()
        .filter(|file_name| file_name == &entry_point_file_name)
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

    let modules = programs
        .into_iter()
        .filter_map(|program| match program {
            Program::Module(module) => Some(module),
            Program::Script(_) => None,
        })
        .collect::<Vec<_>>();

    let entry_point = &modules[0];

    let ic = ic::generate();

    let query_methods = compiler_info.canister_methods.queries.iter().map(|canister_method| {
        let rust_function_name = canister_method.name.to_ident();
        let js_function_name = &canister_method.name;

        quote! {
            #[ic_cdk_macros::query(manual_reply = true)]
            fn #rust_function_name() {
                execute_js(#js_function_name, true);
            }
        }
    });

    let update_methods = compiler_info.canister_methods.updates.iter().map(|canister_method| {
        let rust_function_name = canister_method.name.to_ident();
        let js_function_name = &canister_method.name;

        quote! {
            #[ic_cdk_macros::update(manual_reply = true)]
            fn #rust_function_name() {
                execute_js(#js_function_name, true);
            }
        }
    });

    let heartbeat_method = compiler_info.canister_methods.heartbeat.map(|canister_method| {
        let rust_function_name = canister_method.name.to_ident();
        let js_function_name = &canister_method.name;

        quote! {
            #[ic_cdk_macros::heartbeat]
            fn #rust_function_name() {
                execute_js(#js_function_name, false);
            }
        }
    });

    let inspect_message_method = compiler_info.canister_methods.inspect_message.map(|canister_method| {
        let rust_function_name = canister_method.name.to_ident();
        let js_function_name = &canister_method.name;

        quote! {
            #[ic_cdk_macros::inspect_message]
            fn #rust_function_name() {
                execute_js(#js_function_name, true);
            }
        }
    });

    let lib_file = quote! {
        #![allow(non_snake_case)]
        use quickjs_wasm_rs::{JSContextRef, JSValueRef, JSValue, from_qjs_value, to_qjs_value, CallbackArg};

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

            let _azle_init_name = global.get_property("_azleInitName").unwrap();
            let _azle_init_name_string = if !_azle_init_name.is_undefined() {
                let _azle_init_name_js_value: JSValue = from_qjs_value(&_azle_init_name).unwrap();
                _azle_init_name_js_value.try_into().unwrap()
            } else { "".to_string() };
            
            CONTEXT.with(|ctx| {
                let mut ctx = ctx.borrow_mut();
                *ctx = Some(context);
            });

            if _azle_init_name_string != "" {
                execute_js(&_azle_init_name_string, true);
            }
        }

        #[ic_cdk_macros::post_upgrade]
        fn post_upgrade() {
            unsafe { ic_wasi_polyfill::init(&[], &[]); }

            let context = JSContextRef::default();

            #ic

            context.eval_global("exports.js", "globalThis.exports = {}").unwrap();
            context.eval_global("main.js", std::str::from_utf8(MAIN_JS).unwrap()).unwrap();

            let _azle_post_upgrade_name = global.get_property("_azlePostUpgradeName").unwrap();
            let _azle_post_upgrade_name_string = if !_azle_post_upgrade_name.is_undefined() {
                let _azle_post_upgrade_name_js_value: JSValue = from_qjs_value(&_azle_post_upgrade_name).unwrap();
                _azle_post_upgrade_name_js_value.try_into().unwrap()
            } else { "".to_string() };

            CONTEXT.with(|ctx| {
                let mut ctx = ctx.borrow_mut();
                *ctx = Some(context);
            });

            if _azle_post_upgrade_name_string != "" {
                execute_js(&_azle_post_upgrade_name_string, true);
            }
        }

        #heartbeat_method

        #inspect_message_method

        #(#query_methods)*

        #(#update_methods)*

        fn execute_js(function_name: &str, pass_arg_data: bool) {
            CONTEXT.with(|context| {
                let mut context = context.borrow_mut();
                let context = context.as_mut().unwrap();

                let global = context.global_object().unwrap();
                let exports = global.get_property("exports").unwrap();
                let class = exports.get_property("canisterClass").unwrap();
                let method = class.get_property(function_name).unwrap();

                let candid_args = if pass_arg_data { ic_cdk::api::call::arg_data_raw() } else { vec![] };

                let candid_args_js_value: JSValue = candid_args.into();
                let candid_args_js_value_ref = to_qjs_value(&context, &candid_args_js_value).unwrap();

                // TODO I am not sure what the first parameter to call is supposed to be
                method.call(&method, &[candid_args_js_value_ref]).unwrap();

                context.execute_pending().unwrap();
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
