use proc_macro::TokenStream;
use proc_macro2::Ident;
use quote::{format_ident, quote};
use serde::{Deserialize, Serialize};

mod hash_file;
mod reload_js;
mod upload_file_chunk;

trait ToIdent {
    fn to_ident(&self) -> Ident;
}

impl ToIdent for String {
    fn to_ident(&self) -> Ident {
        format_ident!("{}", self)
    }
}

#[proc_macro]
pub fn canister_methods(_: TokenStream) -> TokenStream {
    let init_method = quote! {
        #[no_mangle]
        #[allow(unused)]
        pub fn init(function_index: i32, pass_arg_data: i32) {
            std::panic::set_hook(Box::new(|panic_info| {
                let msg = if let Some(s) = panic_info.payload().downcast_ref::<&str>() {
                    *s
                } else if let Some(s) = panic_info.payload().downcast_ref::<String>() {
                    s.as_str()
                } else {
                    "Unknown panic message"
                };

                let location = if let Some(location) = panic_info.location() {
                    format!(" at {}:{}", location.file(), location.line())
                } else {
                    " (unknown location)".to_string()
                };

                let message = &format!("Panic occurred: {}{}", msg, location);

                ic_cdk::println!("{}", message);

                ic_cdk::trap(message);
            }));

            let wasm_data = get_wasm_data();

            let env_vars: Vec<(&str, &str)> = wasm_data.env_vars.iter().map(|(key, value)| (key.as_str(), value.as_str())).collect();

            let polyfill_memory =
                MEMORY_MANAGER_REF_CELL.with(|manager| manager.borrow().get(MemoryId::new(254)));
            ic_wasi_polyfill::init_with_memory(&[], &env_vars, polyfill_memory);

            std::fs::write("/candid/icp/management.did", &wasm_data.management_did).unwrap();

            let js = get_js_code();

            initialize_js(std::str::from_utf8(&js).unwrap(), true, function_index, pass_arg_data);

            ic_cdk::spawn(async move {
                open_value_sharing::init(&wasm_data.consumer).await;
            });
        }
    };

    let post_upgrade_method = quote! {
        #[no_mangle]
        #[allow(unused)]
        pub fn post_upgrade(function_index: i32, pass_arg_data: i32) {
            std::panic::set_hook(Box::new(|panic_info| {
                let msg = if let Some(s) = panic_info.payload().downcast_ref::<&str>() {
                    *s
                } else if let Some(s) = panic_info.payload().downcast_ref::<String>() {
                    s.as_str()
                } else {
                    "Unknown panic message"
                };

                let location = if let Some(location) = panic_info.location() {
                    format!(" at {}:{}", location.file(), location.line())
                } else {
                    " (unknown location)".to_string()
                };

                let message = &format!("Panic occurred: {}{}", msg, location);

                ic_cdk::println!("{}", message);

                ic_cdk::trap(message);
            }));

            let wasm_data = get_wasm_data();

            let env_vars: Vec<(&str, &str)> = wasm_data.env_vars.iter().map(|(key, value)| (key.as_str(), value.as_str())).collect();

            let polyfill_memory =
                MEMORY_MANAGER_REF_CELL.with(|manager| manager.borrow().get(MemoryId::new(254)));
            ic_wasi_polyfill::init_with_memory(&[], &env_vars, polyfill_memory);

            std::fs::write("/candid/icp/management.did", &wasm_data.management_did).unwrap();

            let js = get_js_code();

            initialize_js(std::str::from_utf8(&js).unwrap(), false, function_index, pass_arg_data);

            ic_cdk::spawn(async move {
                open_value_sharing::init(&wasm_data.consumer).await;
            });
        }
    };

    let reload_js = reload_js::get_reload_js();

    let upload_file_chunk = upload_file_chunk::get_upload_file_chunk();

    quote! {
        #init_method

        #post_upgrade_method

        #[ic_cdk_macros::query]
        fn __get_candid_interface_tmp_hack() -> String {
            std::str::from_utf8(CANDID)
                .expect("candid.did could not be read")
                .to_string()
        }

        fn initialize_js(js: &str, init: bool, function_index: i32, pass_arg_data: i32) {
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

            if function_index != -1 {
                execute_js(function_index, pass_arg_data);
            }

            // TODO should this only run if it the dev's init/post_upgrade method was called?
            RUNTIME.with(|runtime| {
                let mut runtime = runtime.borrow_mut();
                let runtime = runtime.as_mut().unwrap();

                runtime.run_with_context(|context| {
                    let assignment = if init { "globalThis._azleInitCalled = true;" } else { "globalThis._azlePostUpgradeCalled = true;" };

                    context.eval_global_str(assignment.to_string());
                });
            });
        }

        #reload_js

        #upload_file_chunk
    }
    .into()
}
