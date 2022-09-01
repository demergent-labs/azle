use quote::quote;

pub fn generate_canister_method_body() -> proc_macro2::TokenStream {
    quote! {
        Default::default()
    }
}
