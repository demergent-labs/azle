use crate::{
    generators::canister_methods::method_body,
    ts_ast::{azle_program::HelperMethods, ts_ast::errors, TsAst},
};
use cdk_framework::{nodes::ActHeartbeatMethod, CanisterMethodType};

pub fn build_canister_method_system_heartbeat(ts_ast: &TsAst) -> Option<ActHeartbeatMethod> {
    let heartbeat_fn_decls = ts_ast
        .azle_programs
        .get_azle_fn_decls_of_type(&CanisterMethodType::Heartbeat);

    if heartbeat_fn_decls.len() > 1 {
        let error_message = errors::create_duplicate_method_types_error_message(
            heartbeat_fn_decls,
            CanisterMethodType::Heartbeat,
        );

        panic!("{}", error_message);
    }

    let heartbeat_fn_decl_option = heartbeat_fn_decls.get(0);

    if let Some(heartbeat_fn_decl) = heartbeat_fn_decl_option {
        let call_to_heartbeat_js_function =
            method_body::generate_call_to_js_function(heartbeat_fn_decl);

        let function_name = heartbeat_fn_decl.get_function_name();

        let body = quote::quote! {
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
        };
        Some(ActHeartbeatMethod { body })
    } else {
        None
    }
}
