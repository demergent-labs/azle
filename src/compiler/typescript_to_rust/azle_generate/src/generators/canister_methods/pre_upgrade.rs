use crate::{generators::canister_methods, ts_ast::AzleFnDecl};

pub fn generate_pre_upgrade_method_body(
    pre_upgrade_fn_decl_option: Option<&AzleFnDecl>,
) -> proc_macro2::TokenStream {
    let call_to_pre_upgrade_js_function =
        canister_methods::maybe_generate_call_to_js_function(&pre_upgrade_fn_decl_option);

    let function_name = match pre_upgrade_fn_decl_option {
        Some(pre_upgrade_fn_decl) => pre_upgrade_fn_decl.get_function_name(),
        None => "DOES_NOT_EXIST".to_string(),
    };

    quote::quote! {
        BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
            let mut _azle_boa_context = box_context_ref_cell.borrow_mut();

            METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                let mut method_name_mut = method_name_ref_cell.borrow_mut();

                *method_name_mut = #function_name.to_string()
            });

            #call_to_pre_upgrade_js_function
        })
    }
}
