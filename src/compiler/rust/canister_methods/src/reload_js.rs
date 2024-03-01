use quote::quote;

// TODO there is no authentication on this method
// TODO it is up to the developer to not deploy with this function
// TODO in the binary if they are worried about it
pub fn get_reload_js(env_vars: &Vec<(String, String)>) -> proc_macro2::TokenStream {
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
