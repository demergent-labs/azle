use cdk_framework::act::node::canister_method::{CanisterMethodType, HeartbeatMethod};

use crate::{
    canister_method::{errors, GetAnnotatedFnDecls},
    TsAst,
};

mod rust;

impl TsAst {
    pub fn build_heartbeat_method(&self) -> Option<HeartbeatMethod> {
        let heartbeat_fn_decls = self
            .programs
            .get_annotated_fn_decls_of_type(CanisterMethodType::Heartbeat);

        if heartbeat_fn_decls.len() > 1 {
            let error_message = errors::build_duplicate_method_types_error_message(
                heartbeat_fn_decls,
                CanisterMethodType::Heartbeat,
            );

            panic!("{}", error_message);
        }

        let heartbeat_fn_decl_option = heartbeat_fn_decls.get(0);

        if let Some(heartbeat_fn_decl) = heartbeat_fn_decl_option {
            heartbeat_fn_decl.assert_return_type_is_void();

            let body = rust::generate(heartbeat_fn_decl);
            let guard_function_name = heartbeat_fn_decl.annotation.guard.clone();
            Some(HeartbeatMethod {
                body,
                guard_function_name,
            })
        } else {
            None
        }
    }
}
