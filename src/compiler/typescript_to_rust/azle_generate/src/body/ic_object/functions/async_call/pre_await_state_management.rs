pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        let uuid = crate::ref_cells::get_uuid();
        let method_name = crate::ref_cells::get_method_name();
        let manual = crate::ref_cells::get_is_manual();
    }
}
