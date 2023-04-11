use crate::canister_method::{rust, AnnotatedFnDecl};

pub fn generate(inspect_message_fn_decl: &AnnotatedFnDecl) -> proc_macro2::TokenStream {
    let call_to_inspect_message_js_function =
        rust::generate_call_to_js_function(inspect_message_fn_decl);

    let function_name = inspect_message_fn_decl.get_function_name();

    quote::quote! {
        BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
            let mut boa_context = box_context_ref_cell.borrow_mut();

            METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                let mut method_name_mut = method_name_ref_cell.borrow_mut();

                *method_name_mut = #function_name.to_string()
            });

            #call_to_inspect_message_js_function
        });
    }
}
