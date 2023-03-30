pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        UUID_REF_CELL.with(|uuid_ref_cell| {
            let mut uuid_mut = uuid_ref_cell.borrow_mut();

            *uuid_mut = uuid.clone();
        });

        METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
            let mut method_name_mut = method_name_ref_cell.borrow_mut();

            *method_name_mut = method_name.clone()
        });

        MANUAL_REF_CELL.with(|manual_ref_cell| {
            let mut manual_mut = manual_ref_cell.borrow_mut();

            *manual_mut = manual;
        });
    }
}
