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

    let init_method_call = compiler_info.canister_methods.init.map(|init_method| {
        let js_function_name = &init_method.name;

        quote!(execute_js(#js_function_name, true);)
    });

    let init_method = quote! {
        #[ic_cdk_macros::init]
        fn init() {
            unsafe { ic_wasi_polyfill::init(&[], &[]); }

            let context = JSContextRef::default();

            ic::register(&context);

            context.eval_global("exports.js", "globalThis.exports = {};").unwrap();
            context.eval_global("main.js", std::str::from_utf8(MAIN_JS).unwrap()).unwrap();

            CONTEXT.with(|ctx| {
                let mut ctx = ctx.borrow_mut();
                *ctx = Some(context);
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
            unsafe { ic_wasi_polyfill::init(&[], &[]); }

            let context = JSContextRef::default();

            ic::register(&context);

            context.eval_global("exports.js", "globalThis.exports = {}").unwrap();
            context.eval_global("main.js", std::str::from_utf8(MAIN_JS).unwrap()).unwrap();

            CONTEXT.with(|ctx| {
                let mut ctx = ctx.borrow_mut();
                *ctx = Some(context);
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
                CONTEXT.with(|context| {
                    let mut context = context.borrow_mut();
                    let context = context.as_mut().unwrap();

                    let global = context.global_object().unwrap();
                    let guard_functions = global.get_property("_azleGuardFunctions").unwrap();
                    let guard_function = guard_functions.get_property(#guard_name).unwrap();

                    // TODO I am not sure what the first parameter to call is supposed to be
                    let result = guard_function.call(&guard_function, &[]);

                    match result {
                        Ok(_) => {
                            Ok(())
                        },
                        Err(err_js_value_ref) => {
                            let err: String = err_js_value_ref.to_string();

                            Err(err)
                        }
                    }
                })
            }
        },
    )
}
