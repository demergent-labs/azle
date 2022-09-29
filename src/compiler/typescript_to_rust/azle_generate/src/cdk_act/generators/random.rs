pub fn generate_randomness_implementation() -> proc_macro2::TokenStream {
    quote::quote! {
        fn custom_getrandom(_buf: &mut [u8]) -> Result<(), getrandom::Error> { Ok(()) }

        getrandom::register_custom_getrandom!(custom_getrandom);
    }
}
