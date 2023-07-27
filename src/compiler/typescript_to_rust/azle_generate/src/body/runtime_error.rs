use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        enum RuntimeError {
            IntoVmValueError(String), // TODO: Consider this might be the same as TypeError
            JsError(boa_engine::JsError),
            ReferenceError(String),
            TypeError(String),
            String(String),
        }

        impl RuntimeError {
            pub fn to_string(&self) -> String {
                match self {
                    Self::IntoVmValueError(msg) => msg.to_string(),
                    Self::JsError(js_error) => BOA_CONTEXT_REF_CELL.with(|boa_context_ref_cell| {
                        let mut boa_context = boa_context_ref_cell.borrow_mut();

                        js_error.clone().to_std_string(&mut boa_context)
                    }),
                    Self::ReferenceError(msg) => format!("ReferenceError: {msg}"),
                    Self::TypeError(msg) => format!("TypeError: {msg}"),
                    Self::String(msg) => msg.clone(),
                }
            }
        }

        impl From<boa_engine::JsError> for RuntimeError {
            fn from(value: boa_engine::JsError) -> Self {
                Self::JsError(value)
            }
        }

        impl From<CdkActTryIntoVmValueError> for RuntimeError {
            fn from(value: CdkActTryIntoVmValueError) -> Self {
                Self::IntoVmValueError(value.0)
            }
        }

        impl From<String> for RuntimeError {
            fn from(value: String) -> Self {
                Self::String(value)
            }
        }
    }
}
