use quote::quote;
use serde::{Deserialize, Serialize};
use std::ops::Deref;
use std::path::Path;
use std::{
    env,
    fs::{self, File},
    io::Write,
    process,
};
use swc_common::{sync::Lrc, SourceMap};
use swc_ecma_ast::{Decl, ModuleDecl, ModuleItem, Stmt, TsTypeAliasDecl};
use swc_ecma_codegen::{text_writer::JsWriter, Emitter};
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax, TsConfig};

mod visit_mut_export_decl;

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

    for file_name in compiler_info.file_names {
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

        let mut program = parse_result.map_err(|err| format!("{:#?}", err))?;

        program.visit_mut_with(&mut MyVisitor);

        let mut buf = Vec::new();

        let mut emitter: Emitter<_, SourceMap> = Emitter {
            cfg: Default::default(),
            cm,
            comments: None,
            wr: Box::new(JsWriter::new(Default::default(), "\n", &mut buf, None)),
        };
        emitter.emit_program(&program).unwrap();

        let output = String::from_utf8(buf).expect("failed to convert to string");

        let transformed_dir = Path::new("transformed");

        let mut transformed_path = transformed_dir.to_path_buf();
        for component in filepath.components().skip(1) {
            // Skip the root component
            transformed_path.push(component);
        }

        std::fs::create_dir_all(&transformed_path.parent().unwrap()).unwrap();

        let mut file = File::create(&transformed_path).unwrap();
        file.write_all(output.as_bytes()).unwrap();
        file.flush().unwrap();
    }

    // for mut program in programs {
    // TODO here we will visit
    // program.visit_mut_with(&mut MyVisitor);

    // program.writ

    // Create a writer
    // let mut buf = Vec::new();
    // // let mut writer = JsWriter::new(Default::default(), "\n", &mut buf, None);

    // // Create an emitter and emit the program
    // let mut emitter: Emitter<_, SourceMap> = Emitter {
    //     cfg: Default::default(),
    //     cm: Default::default(),
    //     comments: None,
    //     wr: Box::new(JsWriter::new(Default::default(), "\n", &mut buf, None)),
    // };
    // emitter.emit_program(&program).unwrap();
    // // let transformed_code = String::from_utf8(buf)?;

    // let output = String::from_utf8(buf).expect("failed to convert to string");

    // swc_ecma_codegen::

    // swc_ecma_codegen::

    // println!("{}", output);
    // }

    let lib_file = quote! {
        use quickjs_wasm_rs::{JSContextRef, JSValueRef, JSValue, to_qjs_value};
        use std::convert::TryFrom;
        use std::cell::RefCell;

        const MAIN_JS: &[u8] = include_bytes!("main.js");

        thread_local! {
            static CONTEXT: RefCell<Option<JSContextRef>> = RefCell::new(None);
        }

        #[ic_cdk_macros::init]
        fn init() {
            unsafe { ic_wasi_polyfill::init(&[], &[]); }

            let context = JSContextRef::default();

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

            context.eval_global("exports.js", "globalThis.exports = {}").unwrap();
            context.eval_global("main.js", std::str::from_utf8(MAIN_JS).unwrap()).unwrap();

            CONTEXT.with(|ctx| {
                let mut ctx = ctx.borrow_mut();
                *ctx = Some(context);
            });
        }

        // TODO this part is kind of simple
        // TODO we need to gather all of the functions and put them here
        // TODO and then we just do the exact some thing for each function
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

use swc_common::DUMMY_SP;
use swc_ecma_ast::*;
// use swc_ecma_parser::{lexer::Lexer, JscTarget, Parser, StringInput};
// use swc_ecma_transforms_base::fixer;
use swc_ecma_visit::{noop_visit_mut_type, Fold, FoldWith, VisitMut, VisitMutWith};

pub struct MyVisitor;

impl VisitMut for MyVisitor {
    // noop_visit_mut_type!();

    // fn visit_mut_module_item(&mut self, item: &mut ModuleItem) {
    //     if item.is_candid_record() {
    //         *item = item.as_candid_record_idl();
    //     }

    //     // if item.is_canister_query_method() {
    //     //     *item = item.as_canister_query_method_idl();
    //     // }

    //     swc_ecma_visit::visit_mut_module_item(self, item);
    // }

    // fn visit_mut_export_decl(&mut self, export_decl: &mut ExportDecl) {
    //     visit_mut_export_decl::visit_mut_export_decl(self, export_decl)
    // }

    // fn visit_mut_fn_decl(&mut self, fn_decl: &mut FnDecl) {
    //     // if !fn_decl.is_canister_query_method() {
    //     //     return;
    //     // }

    //     fn_decl.function.params = vec![Param {
    //         span: DUMMY_SP,
    //         decorators: vec![],
    //         pat: Pat::Ident(BindingIdent::from(Ident::new("candidEncodedArgs".into(), DUMMY_SP))),
    //     }];

    //     // *fn_decl = FnDecl {
    //     //     function: Box::new(Function {
    //     //         params: vec![Param {
    //     //             span: DUMMY_SP,
    //     //             decorators: vec![],
    //     //             pat: Pat::Ident(BindingIdent::from(Ident::new("candidEncodedArgs".into(), DUMMY_SP))),
    //     //         }],
    //     //         body: todo!(),
    //     //         ..*fn_decl.function.clone()
    //     //     }),
    //     //     ..fn_decl.clone()
    //     // };
    // }

    // fn visit_mut_module_items(&mut self, items: &mut Vec<ModuleItem>) {}

    // fn visit_mut_ts_type_alias_decl(&mut self, ts_type_alias_decl: &mut TsTypeAliasDecl) {
    //     let name = ts_type_alias_decl.id.sym.chars().as_str().to_string();

    //     ts_type_alias_decl.id.sym = (name + "Hello").into();
    // }

    // fn visit_

    // fn visit_mut_expr(&mut self, expr: &mut Expr) {
    //     // Modify the AST as needed. For example, you might add a new node after a specific node.

    //     match expr {
    //         Expr::Ident(ident) => {
    //             *expr = Expr::Seq(SeqExpr {
    //                 span: DUMMY_SP,
    //                 exprs: vec![
    //                     Box::new(Expr::Ident(ident.clone())),
    //                     Box::new(Expr::Ident(ident.clone())),
    //                 ],
    //             });
    //         }
    //         _ => {}
    //     }

    //     // Continue traversing the AST
    //     expr.visit_mut_children_with(self);
    // }
}

trait CandidUtils {
    fn is_candid_record(&self) -> bool {
        todo!()
    }

    fn as_candid_record_idl(&self) -> ModuleItem {
        todo!()
    }

    fn is_canister_query_method(&self) -> bool {
        todo!()
    }

    fn as_canister_query_method_idl(&self) -> ModuleItem {
        todo!()
    }
}

impl CandidUtils for ModuleItem {
    fn is_candid_record(&self) -> bool {
        if let ModuleItem::Stmt(Stmt::Decl(Decl::TsTypeAlias(ts_type_alias_decl))) = self {
            if let TsType::TsTypeRef(ts_type_ref) = &*ts_type_alias_decl.type_ann {
                if let TsEntityName::Ident(ident) = &ts_type_ref.type_name {
                    return ident.sym.chars().as_str() == "Record"; // TODO of course we should hook in the robust imports there
                }
            }
        }

        false
    }

    fn as_candid_record_idl(&self) -> ModuleItem {
        if let ModuleItem::Stmt(Stmt::Decl(Decl::TsTypeAlias(ts_type_alias_decl))) = self {
            if let TsType::TsTypeRef(ts_type_ref) = &*ts_type_alias_decl.type_ann {
                if let TsType::TsTypeLit(ts_type_lit) =
                    &*ts_type_ref.type_params.as_ref().unwrap().params[0]
                {
                    let obj_props: Vec<PropOrSpread> = ts_type_lit
                        .members
                        .iter()
                        .filter_map(|member| {
                            if let TsTypeElement::TsPropertySignature(prop_sig) = member {
                                if let Expr::Ident(key) = &*prop_sig.key {
                                    return Some(PropOrSpread::Prop(Box::new(Prop::KeyValue(
                                        KeyValueProp {
                                            key: PropName::Ident(key.clone()),
                                            value: Box::new(Expr::Member(MemberExpr {
                                                span: DUMMY_SP,
                                                obj: Box::new(Expr::Ident(Ident::new(
                                                    "IDL".into(),
                                                    DUMMY_SP,
                                                ))),
                                                // TODO here we would need to figure out the actual type
                                                // TODO consider that this would need to be recursive
                                                // TODO and would need to handle type refs (which should be easy)
                                                prop: MemberProp::Ident(Ident::new(
                                                    "Text".into(),
                                                    DUMMY_SP,
                                                )),
                                            })),
                                        },
                                    ))));
                                }
                            }
                            None
                        })
                        .collect();

                    let obj_lit = Expr::Object(ObjectLit {
                        span: DUMMY_SP,
                        props: obj_props,
                    });

                    let call_expr = Expr::Call(CallExpr {
                        span: DUMMY_SP,
                        callee: Callee::Expr(Box::new(Expr::Member(MemberExpr {
                            span: DUMMY_SP,
                            obj: Box::new(Expr::Ident(Ident::new("IDL".into(), DUMMY_SP))),
                            prop: MemberProp::Ident(Ident::new("Record".into(), DUMMY_SP)),
                        }))),
                        args: vec![ExprOrSpread {
                            spread: None,
                            expr: Box::new(obj_lit),
                        }],
                        type_args: None,
                    });

                    return ModuleItem::Stmt(Stmt::Decl(Decl::Var(Box::new(VarDecl {
                        span: DUMMY_SP,
                        kind: VarDeclKind::Const,
                        declare: false,
                        decls: vec![VarDeclarator {
                            span: DUMMY_SP,
                            name: Pat::Ident(BindingIdent::from(ts_type_alias_decl.id.clone())),
                            init: Some(Box::new(call_expr)),
                            definite: false,
                        }],
                    }))));
                }
            }
        }

        todo!()
    }

    // TODO simply fill in with all types
}

impl CandidUtils for FnDecl {
    fn is_canister_query_method(&self) -> bool {
        if let Some(type_params) = &self.function.type_params {
            if let Some(first_param) = type_params.params.get(0) {
                let name_ident = &first_param.name;
                let name = name_ident.sym.chars().as_str();

                if name == "query" {
                    return true;
                }
            }
        }

        false
    }
}

// fn main() -> Result<(), Box<dyn std::error::Error>> {
//     let code = "const target = 'example';";

//     let cm = swc_common::Globals::new();
//     let fm = cm
//         .load_sourcemaps()
//         .new_source_file(swc_common::FileName::Anon, code.into());

//     let lexer = Lexer::new(
//         swc_ecma_parser::Syntax::default(),
//         JscTarget::Es2020,
//         StringInput::from(&*fm),
//         None,
//     );

//     let mut parser = Parser::new_from(lexer);

//     let mut program = parser.parse_program()?;
//     program.visit_mut_with(&mut MyVisitor);
//     program = program.fold_with(&mut fixer(None));

//     // Print the transformed code
//     let transformed_code = {
//         let mut buf = Vec::new();
//         {
//             use std::io::Write;
//             let mut emitter = swc_ecma_codegen::Emitter::new(
//                 &mut buf,
//                 swc_ecma_codegen::text_writer::JsWriter::new(&cm, "\n", &mut buf, None),
//                 None,
//             );
//             emitter.emit_program(&program)?;
//         }

//         String::from_utf8(buf)?
//     };

//     println!("{}", transformed_code);

//     Ok(())
// }

pub fn generate_typescript(program: &mut Program) {
    program.visit_mut_with(&mut MyVisitor);
}
