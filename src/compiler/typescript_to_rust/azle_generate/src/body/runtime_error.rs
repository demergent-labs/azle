use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        enum RuntimeError {
            FromVmValueError(String), // TODO: Consider this might be the same as TypeError
            IntoVmValueError(String), // TODO: Consider this might be the same as TypeError
            JsError(boa_engine::JsError),
            ReferenceError(String),
            TypeError(String),
        }

        impl RuntimeError {
            pub fn to_string(&self) -> String {
                match self {
                    Self::FromVmValueError(msg) => msg.to_string(),
                    Self::IntoVmValueError(msg) => msg.to_string(),
                    Self::JsError(js_error_value) => {
                        BOA_CONTEXT_REF_CELL.with(|boa_context_ref_cell| {
                            let mut boa_context = boa_context_ref_cell.borrow_mut();

                            js_value_to_string(js_error_value.to_opaque(&mut boa_context), &mut boa_context)
                        })
                    },
                    Self::ReferenceError(msg) => format!("ReferenceError: {msg}"),
                    Self::TypeError(msg) => format!("TypeError: {msg}"),
                }
            }
        }

        impl From<boa_engine::JsError> for RuntimeError {
            fn from(value: boa_engine::JsError) -> Self {
                Self::JsError(value)
            }
        }

        impl From<CdkActTryFromVmValueError> for RuntimeError {
            fn from(value: CdkActTryFromVmValueError) -> Self {
                Self::FromVmValueError(value.0)
            }
        }

        impl From<CdkActTryIntoVmValueError> for RuntimeError {
            fn from(value: CdkActTryIntoVmValueError) -> Self {
                Self::IntoVmValueError(value.0)
            }
        }
    }
}
