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

            initialize_js(std::str::from_utf8(MAIN_JS).unwrap(), true);
        }
    };

    let post_upgrade_method_call =
        compiler_info
            .canister_methods
            .post_upgrade
            .map(|post_upgrade_method| {
                let js_function_name = &post_upgrade_method.name;

                quote!(execute_js(#js_function_name, true);)
            });

    let post_upgrade_method = quote! {
        #[ic_cdk_macros::post_upgrade]
        fn post_upgrade() {
            ic_wasi_polyfill::init(&[], &[#(#env_vars),*]);

            ASSETS_DIR.extract("/").unwrap();

            initialize_js(std::str::from_utf8(MAIN_JS).unwrap(), false);
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

    let reload_js = get_reload_js(&compiler_info.env_vars);

    let upload_assets = get_upload_assets();

    quote! {
        static ASSETS_DIR: Dir = include_dir!("$CARGO_MANIFEST_DIR/src/assets");

        #init_method

        #post_upgrade_method

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

        fn initialize_js(js: &str, init: bool) {
            let mut rt = wasmedge_quickjs::Runtime::new();

            let r = rt.run_with_context(|context| {
                ic::register(context);
                web_assembly::register(context);

                // TODO what do we do if there is an error in here?
                context.eval_global_str("globalThis.exports = {};".to_string());
                context.eval_module_str(js.to_string(), "azle_main");

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

            if init == true {
                #init_method_call
            }
            else {
                #post_upgrade_method_call
            }
        }

        #reload_js

        #upload_assets
    }
    .into()
}

fn get_compiler_info(compiler_info_path: &str) -> Result<CompilerInfo, String> {
    if let Ok(azle_skip_compiler_info) = std::env::var("AZLE_SKIP_COMPILER_INFO") {
        if azle_skip_compiler_info == "true" {
            return Ok(CompilerInfo {
                canister_methods: CanisterMethods {
                    init: None,
                    post_upgrade: None,
                    pre_upgrade: None,
                    inspect_message: None,
                    heartbeat: None,
                    queries: vec![],
                    updates: vec![],
                },
                env_vars: vec![],
            });
        }
    }

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

// TODO there is no authentication on this method
// TODO it is up to the developer to not deploy with this function
// TODO in the binary if they are worried about it
fn get_reload_js(env_vars: &Vec<(String, String)>) -> proc_macro2::TokenStream {
    let azle_autoreload_env_var = env_vars.iter().find(|(key, _)| key == "AZLE_AUTORELOAD");

    if let Some((_, value)) = azle_autoreload_env_var {
        if value == "true" {
            return quote! {
                #[ic_cdk_macros::update]
                fn reload_js(timestamp: u64, chunk_number: u64, js_bytes: Vec<u8>, total_len: u64) {
                    RELOADED_JS_TIMESTAMP.with(|reloaded_js_timestamp| {
                        let mut reloaded_js_timestamp_mut = reloaded_js_timestamp.borrow_mut();

                        if timestamp > *reloaded_js_timestamp_mut {
                            *reloaded_js_timestamp_mut = timestamp;

                            RELOADED_JS.with(|reloaded_js| {
                                let mut reloaded_js_mut = reloaded_js.borrow_mut();
                                reloaded_js_mut.clear();
                            });
                        }
                    });

                    RELOADED_JS.with(|reloaded_js| {
                        let mut reloaded_js_mut = reloaded_js.borrow_mut();
                        reloaded_js_mut.insert(chunk_number, js_bytes);

                        let reloaded_js_complete_bytes: Vec<u8> = reloaded_js_mut.values().flat_map(|v| v.clone()).collect();

                        if reloaded_js_complete_bytes.len() as u64 == total_len {
                            let js_string = String::from_utf8_lossy(&reloaded_js_complete_bytes);
                            initialize_js(&js_string, false);
                        }
                    });
                }
            };
        }
    }

    quote! {}
}

fn get_upload_assets() -> proc_macro2::TokenStream {
    quote! {
        #[ic_cdk_macros::update]
        fn upload_asset(des: String, timestamp: u64, chunk_number: u64, js_bytes: Vec<u8>, total_len: u64) {
            UPLOADED_ASSETS_TIMESTAMP.with(|upload_assets_timestamp| {
                let mut upload_assets_timestamp_mut = upload_assets_timestamp.borrow_mut();

                if timestamp > *upload_assets_timestamp_mut {
                    *upload_assets_timestamp_mut = timestamp;

                    UPLOADED_ASSETS.with(|upload_assets| {
                        let mut upload_assets_mut = upload_assets.borrow_mut();
                        upload_assets_mut.clear();
                    });
                }
            });

            UPLOADED_ASSETS.with(|upload_assets| {
                let mut upload_assets_mut = upload_assets.borrow_mut();
                upload_assets_mut.insert(chunk_number, js_bytes);

                let upload_assets_complete_bytes: Vec<u8> = upload_assets_mut.values().flat_map(|v| v.clone()).collect();

                if upload_assets_complete_bytes.len() as u64 == total_len {

                    let asset_string = String::from_utf8_lossy(&upload_assets_complete_bytes);

                    let dir_path = std::path::Path::new(des.as_str()).parent().unwrap();

                    std::fs::create_dir_all(dir_path).unwrap();

                    let mut file = std::fs::File::create(des).unwrap();

                    std::io::Write::write_all(&mut file, asset_string.as_bytes()).unwrap();

                    // flush the buffer to ensure all data is written immediately
                    std::io::Write::flush(&mut file).unwrap();
                }
            });
        }
    }
}
