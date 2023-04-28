use crate::canister_method::{rust, AnnotatedFnDecl};

pub fn generate(heartbeat_fn_decl: &AnnotatedFnDecl) -> proc_macro2::TokenStream {
    let call_to_heartbeat_js_function = rust::generate_call_to_js_function(heartbeat_fn_decl);

    let function_name = heartbeat_fn_decl.get_function_name();

    quote::quote! {
        BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
            let mut boa_context = box_context_ref_cell.borrow_mut();

            let uuid = uuid::Uuid::new_v4().to_string();

            UUID_REF_CELL.with(|uuid_ref_cell| {
                let mut uuid_mut = uuid_ref_cell.borrow_mut();

                *uuid_mut = uuid.clone();
            });

            METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                let mut method_name_mut = method_name_ref_cell.borrow_mut();

                *method_name_mut = #function_name.to_string()
            });

            MANUAL_REF_CELL.with(|manual_ref_cell| {
                let mut manual_mut = manual_ref_cell.borrow_mut();

                *manual_mut = true;
            });

            #call_to_heartbeat_js_function

            async_await_result_handler(
                &mut boa_context,
                &boa_return_value,
                &uuid,
                #function_name,
                true
            );
        });
    }
}
