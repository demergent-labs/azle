use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        trait ToJsError {
            fn to_js_error(self, opt_cause: Option<boa_engine::JsError>) -> boa_engine::JsError;
        }

        impl ToJsError for CdkActTryIntoVmValueError {
            fn to_js_error(self, opt_cause: Option<boa_engine::JsError>) -> boa_engine::JsError {
                self.0.to_js_error(opt_cause)
            }
        }

        impl ToJsError for String {
            fn to_js_error(self, opt_cause: Option<boa_engine::JsError>) -> boa_engine::JsError {
                self.as_str().to_js_error(opt_cause)
            }
        }

        impl<'a> ToJsError for &'a str {
            fn to_js_error(self, opt_cause: Option<boa_engine::JsError>) -> boa_engine::JsError {
                let raw_error_message = self;
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

                        let js_native_error = match *error_type {
                            "Error: " => boa_engine::error::JsNativeError::error(),
                            "EvalError: " => boa_engine::error::JsNativeError::eval(),
                            "RangeError: " => boa_engine::error::JsNativeError::range(),
                            "ReferenceError: " => boa_engine::error::JsNativeError::reference(),
                            "SyntaxError: " => boa_engine::error::JsNativeError::syntax(),
                            "TypeError: " => boa_engine::error::JsNativeError::typ(),
                            "UriError: " => boa_engine::error::JsNativeError::uri(),
                            _ => unreachable!(),
                        }
                        .with_message(message);

                        return match opt_cause {
                            Some(cause) => js_native_error.with_cause(cause),
                            None => js_native_error,
                        }
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
