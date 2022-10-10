use crate::{
    cdk_act::{nodes::ActHeartbeatMethod, CanisterMethodType},
    generators::canister_methods::method_body,
    ts_ast::program::{azle_program::TsProgramVecHelperMethods, AzleProgram},
};

pub fn build_canister_method_system_heartbeat(
    programs: &Vec<AzleProgram>,
) -> Option<ActHeartbeatMethod> {
    let heartbeat_fn_decls = programs.get_fn_decls_of_type(&CanisterMethodType::Heartbeat);

    if heartbeat_fn_decls.len() > 1 {
        panic!("Only one Heartbeat function can be defined");
    }

    let heartbeat_fn_decl_option = heartbeat_fn_decls.get(0);

    if let Some(heartbeat_fn_decl) = heartbeat_fn_decl_option {
        let call_to_heartbeat_js_function =
            method_body::generate_call_to_js_function(heartbeat_fn_decl);
        let body = quote::quote! {
                unsafe {
                    ic_cdk::spawn(async {
                        let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                        #call_to_heartbeat_js_function

                        _azle_async_result_handler(
                            &mut _azle_boa_context,
                            &_azle_boa_return_value
                        ).await;
                    });
                }
        };
        Some(ActHeartbeatMethod { body })
    } else {
        None
    }
}
