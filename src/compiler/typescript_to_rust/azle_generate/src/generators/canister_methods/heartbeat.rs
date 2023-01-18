use crate::{generators::canister_methods, ts_ast::AzleFnDecl};

pub fn generate_heartbeat_method_body(heartbeat_fn_decl: &AzleFnDecl) -> proc_macro2::TokenStream {
    let call_to_heartbeat_js_function =
        canister_methods::generate_call_to_js_function(heartbeat_fn_decl);

    let function_name = heartbeat_fn_decl.get_function_name();

    quote::quote! {
        BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
            let mut _azle_boa_context = box_context_ref_cell.borrow_mut();

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

            _azle_async_await_result_handler(
                &mut _azle_boa_context,
                &_azle_boa_return_value,
                &uuid,
                #function_name,
                true
            );
        });
    }
}
