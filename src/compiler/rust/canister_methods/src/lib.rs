// TODO we need an easy way to see the expanded file now
// TODO perhaps we should automatically do this and store it in the filesystem for easy retrieval?

use std::fs;

use proc_macro::TokenStream;
use proc_macro2::Ident;
use quote::{format_ident, quote};
use serde::{Deserialize, Serialize};

trait ToIdent {
    fn to_ident(&self) -> Ident;
}

impl ToIdent for String {
    fn to_ident(&self) -> Ident {
        format_ident!("{}", self)
    }
}

#[derive(Debug, Serialize, Deserialize)]
struct CompilerInfo {
    canister_methods: CanisterMethods,
    env_vars: Vec<(String, String)>,
}

#[derive(Debug, Serialize, Deserialize)]
struct CanisterMethods {
    init: Option<CanisterMethod>,
    post_upgrade: Option<CanisterMethod>,
    pre_upgrade: Option<CanisterMethod>,
    inspect_message: Option<CanisterMethod>,
    heartbeat: Option<CanisterMethod>,
    queries: Vec<CanisterMethod>,
    updates: Vec<CanisterMethod>,
}

#[derive(Debug, Serialize, Deserialize)]
struct CanisterMethod {
    name: String,
    composite: Option<bool>,
    guard_name: Option<String>,
}

#[proc_macro]
pub fn canister_methods(_: TokenStream) -> TokenStream {
    let compiler_info = get_compiler_info("canister/src/compiler_info.json").unwrap();

    let env_vars: Vec<_> = compiler_info
        .env_vars
        .iter()
        .map(|(key, value)| quote!((#key, #value)))
        .collect();

    let init_method_call = compiler_info.canister_methods.init.map(|init_method| {
        let js_function_name = &init_method.name;

        quote!(execute_js(#js_function_name, true);)
    });

    let init_method = quote! {
        #[ic_cdk_macros::init]
        fn init() {
            ic_wasi_polyfill::init(&[], &[#(#env_vars),*]);

            ASSETS_DIR.extract("/").unwrap();

            let mut rt = wasmedge_quickjs::Runtime::new();

            let r = rt.run_with_context(|context| {
                ic::register(context);
                web_assembly::register(context);

                // TODO what do we do if there is an error in here?
                context.eval_global_str("globalThis.exports = {};".to_string());
                context.eval_module_str(std::str::from_utf8(MAIN_JS).unwrap().to_string(), "azle_main");

                run_event_loop(context);

                // let temp = context.eval_module_str(std::str::from_utf8(MAIN_JS).unwrap().to_string(), "azle_main");

                // match &temp {
                //     wasmedge_quickjs::JsValue::Exception(js_exception) => {
                //         js_exception.dump_error();
                //         panic!("we had an error");
                //     },
                //     _ => {}
                // };

                // ic_cdk::println!("temp: {:#?}", temp);
            });

            RUNTIME.with(|runtime| {
                let mut runtime = runtime.borrow_mut();
                *runtime = Some(rt);
            });

            #init_method_call
        }
    };

    let post_update_method_call =
        compiler_info
            .canister_methods
            .post_upgrade
            .map(|post_upgrade_method| {
                let js_function_name = &post_upgrade_method.name;

                quote!(execute_js(#js_function_name, true);)
            });

    let post_update_method = quote! {
        #[ic_cdk_macros::post_upgrade]
        fn post_upgrade() {
            ic_wasi_polyfill::init(&[], &[#(#env_vars),*]);

            ASSETS_DIR.extract("/").unwrap();

            let mut rt = wasmedge_quickjs::Runtime::new();

            let r = rt.run_with_context(|context| {
                ic::register(context);
                web_assembly::register(context);

                // TODO what do we do if there is an error in here?
                context.eval_global_str("globalThis.exports = {};".to_string());
                context.eval_module_str(std::str::from_utf8(MAIN_JS).unwrap().to_string(), "azle_main");

                run_event_loop(context);

                // let temp = context.eval_module_str(std::str::from_utf8(MAIN_JS).unwrap().to_string(), "azle_main");

                // match &temp {
                //     wasmedge_quickjs::JsValue::Exception(js_exception) => {
                //         js_exception.dump_error();
                //         panic!("we had an error");
                //     },
                //     _ => {}
                // };

                // ic_cdk::println!("temp: {:#?}", temp);
            });

            RUNTIME.with(|runtime| {
                let mut runtime = runtime.borrow_mut();
                *runtime = Some(rt);
            });

            #post_update_method_call
        }
    };

    let pre_upgrade_method = compiler_info
        .canister_methods
        .pre_upgrade
        .map(|canister_method| {
            let rust_function_name = canister_method.name.to_ident();
            let js_function_name = &canister_method.name;

            quote! {
                #[ic_cdk_macros::pre_upgrade]
                fn #rust_function_name() {
                    execute_js(#js_function_name, false);
                }
            }
        });

    let inspect_message_method =
        compiler_info
            .canister_methods
            .inspect_message
            .map(|canister_method| {
                let rust_function_name = canister_method.name.to_ident();
                let js_function_name = &canister_method.name;

                quote! {
                    #[ic_cdk_macros::inspect_message]
                    fn #rust_function_name() {
                        execute_js(#js_function_name, true);
                    }
                }
            });

    let heartbeat_method = compiler_info
        .canister_methods
        .heartbeat
        .map(|canister_method| {
            let rust_function_name = canister_method.name.to_ident();
            let js_function_name = &canister_method.name;

            quote! {
                #[ic_cdk_macros::heartbeat]
                fn #rust_function_name() {
                    execute_js(#js_function_name, false);
                }
            }
        });

    let query_methods = compiler_info
        .canister_methods
        .queries
        .iter()
        .map(|canister_method| {
            let rust_function_name = canister_method.name.to_ident();
            let js_function_name = &canister_method.name;
            let is_composite = canister_method.composite.unwrap_or(false);

            let (guard_attribute, guard_function) = if let Some(guard_name) = &canister_method.guard_name
            {
                get_guard_token_stream(guard_name)
            } else {
                (quote!(), quote!())
            };

            quote! {
                #[ic_cdk_macros::query(manual_reply = true, composite = #is_composite #guard_attribute)]
                fn #rust_function_name() {
                    execute_js(#js_function_name, true);
                }

                #guard_function
            }
        });

    let update_methods = compiler_info
        .canister_methods
        .updates
        .iter()
        .map(|canister_method| {
            let rust_function_name = canister_method.name.to_ident();
            let js_function_name = &canister_method.name;

            let (guard_attribute, guard_function) =
                if let Some(guard_name) = &canister_method.guard_name {
                    get_guard_token_stream(guard_name)
                } else {
                    (quote!(), quote!())
                };

            quote! {
                #[ic_cdk_macros::update(manual_reply = true #guard_attribute)]
                fn #rust_function_name() {
                    execute_js(#js_function_name, true);
                }

                #guard_function
            }
        });

    quote! {
        static ASSETS_DIR: Dir = include_dir!("$CARGO_MANIFEST_DIR/src/assets");

        #init_method

        #post_update_method

        #pre_upgrade_method

        #inspect_message_method

        #heartbeat_method

        #(#query_methods)*

        #(#update_methods)*

        #[ic_cdk_macros::query]
        fn __get_candid_interface_tmp_hack() -> String {
            std::str::from_utf8(CANDID)
                .expect("candid.did could not be read")
                .to_string()
        }
    }
    .into()
}

fn get_compiler_info(compiler_info_path: &str) -> Result<CompilerInfo, String> {
    let compiler_info_string = fs::read_to_string(compiler_info_path)
        .map_err(|err| format!("Error reading {compiler_info_path}: {err}"))?;
    let compiler_info: CompilerInfo = serde_json::from_str(&compiler_info_string)
        .map_err(|err| format!("Error parsing {compiler_info_path}: {err}"))?;

    Ok(compiler_info)
}

fn get_guard_token_stream(
    guard_name: &str,
) -> (proc_macro2::TokenStream, proc_macro2::TokenStream) {
    let guard_name_ident = guard_name.to_string().to_ident();

    (
        quote!(, guard = #guard_name),
        quote! {
            // TODO should the guard function have access to the raw args?
            fn #guard_name_ident() -> Result<(), String> {
                RUNTIME.with(|runtime| {
                    let mut runtime = runtime.borrow_mut();
                    let runtime = runtime.as_mut().unwrap();

                    runtime.run_with_context(|context| {
                        let global = context.get_global();

                        let guard_functions = global.get("_azleGuardFunctions").to_obj().unwrap();

                        let guard_function = guard_functions.get(#guard_name).to_function().unwrap();

                        let result = guard_function.call(&[]);

                        // TODO error handling is mostly done in JS right now
                        // TODO we would really like wasmedge-quickjs to add
                        // TODO good error info to JsException and move error handling
                        // TODO out of our own code
                        match &result {
                            wasmedge_quickjs::JsValue::Exception(js_exception) => {
                                js_exception.dump_error();
                                Err("TODO needs error info".to_string())
                            }
                            _ => {
                                // TODO what if errors happen in here?
                                // TODO can guard functions even be async?
                                // TODO I don't think they can
                                run_event_loop(context);

                                Ok(())
                            }
                        }
                    })
                })
            }
        },
    )
}
