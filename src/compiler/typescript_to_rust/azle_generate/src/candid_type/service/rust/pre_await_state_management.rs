pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        let uuid = UUID_REF_CELL.with(|uuid_ref_cell| uuid_ref_cell.borrow().clone());
        let method_name = METHOD_NAME_REF_CELL.with(|method_name_ref_cell| method_name_ref_cell.borrow().clone());
        let manual = MANUAL_REF_CELL.with(|manual_ref_cell| manual_ref_cell.borrow().clone());
    }
}
