use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn unwrap_or_trap<SuccessValue, Callback>(callback: Callback) -> SuccessValue
        where
            Callback: FnOnce() -> Result<SuccessValue, RuntimeError>,
        {
            callback()
                .unwrap_or_else(|err| ic_cdk::api::trap(&format!("\nUncaught {}", err.to_string())))
        }

        pub trait UnwrapJsResultOrTrap {
            fn unwrap_or_trap(self, context: &mut boa_engine::Context) -> boa_engine::JsValue;
        }

        impl UnwrapJsResultOrTrap for boa_engine::JsResult<boa_engine::JsValue> {
            fn unwrap_or_trap(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                match self {
                    Ok(js_value) => js_value,
                    Err(js_error) => {
                        let error_message = js_error.to_std_string(context);

                        ic_cdk::api::trap(&format!("\nUncaught {error_message}"));
                    }
                }
            }
        }

        impl UnwrapJsResultOrTrap for Result<boa_engine::JsValue, String> {
            fn unwrap_or_trap(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                match self {
                    Ok(js_value) => js_value,
                    Err(error_string) => {
                        ic_cdk::api::trap(&format!("\nUncaught {error_string}"));
                    }
                }
            }
        }

        pub trait UnwrapOrTrapWithMessage<T> {
            fn unwrap_or_trap(self, err_message: &str) -> T;
        }

        impl<T> UnwrapOrTrapWithMessage<T> for Option<T> {
            fn unwrap_or_trap(self, err_message: &str) -> T {
                match self {
                    Some(some) => some,
                    None => ic_cdk::trap(&format!("\nUncaught {err_message}")),
                }
            }
        }
    }
}
