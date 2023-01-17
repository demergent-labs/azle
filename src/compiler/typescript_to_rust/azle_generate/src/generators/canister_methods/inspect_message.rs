use crate::{generators::canister_methods, ts_ast::AzleFnDecl};

pub fn generate_inspect_message_method_body(
    inspect_message_fn_decl: &AzleFnDecl,
) -> proc_macro2::TokenStream {
    let call_to_inspect_message_js_function =
        canister_methods::generate_call_to_js_function(inspect_message_fn_decl);

    let function_name = inspect_message_fn_decl.get_function_name();

    quote::quote! {
        BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
            let mut _azle_boa_context = box_context_ref_cell.borrow_mut();

            METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                let mut method_name_mut = method_name_ref_cell.borrow_mut();

                *method_name_mut = #function_name.to_string()
            });

            #call_to_inspect_message_js_function
        });
    }
}
