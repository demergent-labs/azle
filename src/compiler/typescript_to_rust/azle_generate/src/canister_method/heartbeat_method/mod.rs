use cdk_framework::act::node::canister_method::{CanisterMethodType, HeartbeatMethod};

mod rust;

use crate::{canister_method::errors, ts_ast::AzleFnDecl, TsAst};

impl TsAst {
    pub fn build_heartbeat_method(&self) -> Option<HeartbeatMethod> {
        let heartbeat_fn_decls: Vec<AzleFnDecl> =
            self.get_annotated_function_decls_of_type(CanisterMethodType::Heartbeat);

        if heartbeat_fn_decls.len() > 1 {
            let error_message = errors::build_duplicate_method_types_error_message(
                heartbeat_fn_decls,
                CanisterMethodType::Heartbeat,
            );

            panic!("{}", error_message);
        }

        let heartbeat_fn_decl_option = heartbeat_fn_decls.get(0);

        if let Some(heartbeat_fn_decl) = heartbeat_fn_decl_option {
            let body = rust::generate(heartbeat_fn_decl);
            Some(HeartbeatMethod { body })
        } else {
            None
        }
    }
}
