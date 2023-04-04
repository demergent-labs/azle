pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        crate::ref_cells::set_uuid(&uuid);
        crate::ref_cells::set_method_name(&method_name);
        crate::ref_cells::set_is_manual(manual);
    }
}
