use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn unwrap_or_trap<SuccessValue, Callback>(callback: Callback) -> SuccessValue
        where
            Callback: FnOnce() -> Result<SuccessValue, String>,
        {
            callback().unwrap_or_else(|err| ic_cdk::api::trap(&format!("Uncaught {}", err)))
        }
    }
}
