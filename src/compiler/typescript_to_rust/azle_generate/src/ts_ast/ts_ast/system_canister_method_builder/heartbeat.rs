use crate::{
    generators::canister_methods::heartbeat,
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
        let body = heartbeat::generate_heartbeat_method_body(heartbeat_fn_decl);
        Some(ActHeartbeatMethod { body })
    } else {
        None
    }
}
