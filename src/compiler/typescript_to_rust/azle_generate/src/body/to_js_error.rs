use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        trait ToJsError {
            fn to_js_error(self) -> boa_engine::JsError;
        }

        impl ToJsError for CdkActTryIntoVmValueError {
            fn to_js_error(self) -> boa_engine::JsError {
                self.0.to_js_error()
            }
        }

        impl ToJsError for CdkActTryFromVmValueError {
            fn to_js_error(self) -> boa_engine::JsError {
                self.0.to_js_error()
            }
        }

        impl ToJsError for String {
            fn to_js_error(self) -> boa_engine::JsError {
                let raw_error_message = self.as_str();
                let error_types = [
                    "Error: ",
                    "EvalError: ",
                    "RangeError: ",
                    "ReferenceError: ",
                    "SyntaxError: ",
                    "TypeError: ",
                    "UriError: ",
                ];

                for error_type in error_types.iter() {
                    if raw_error_message.starts_with(error_type) {
                        let message = raw_error_message
                            .splitn(2, error_type)
                            .collect::<Vec<&str>>()[1];

                        return match *error_type {
                            "Error: " => boa_engine::error::JsNativeError::error(),
                            "EvalError: " => boa_engine::error::JsNativeError::eval(),
                            "RangeError: " => boa_engine::error::JsNativeError::range(),
                            "ReferenceError: " => boa_engine::error::JsNativeError::reference(),
                            "SyntaxError: " => boa_engine::error::JsNativeError::syntax(),
                            "TypeError: " => boa_engine::error::JsNativeError::typ(),
                            "UriError: " => boa_engine::error::JsNativeError::uri(),
                            _ => unreachable!(),
                        }
                        .with_message(message)
                        .into();
                    }
                }

                return boa_engine::error::JsNativeError::error()
                    .with_message(raw_error_message)
                    .into();
            }
        }
    }
}
