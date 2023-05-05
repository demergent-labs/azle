use cdk_framework::act::node::canister_method::{CanisterMethodType, HeartbeatMethod};

use super::AnnotatedFnDecl;
use crate::{canister_method::errors::DuplicateSystemMethod, Error, TsAst};

mod rust;

impl TsAst {
    pub fn build_heartbeat_method(
        &self,
        annotated_fn_decls: &Vec<AnnotatedFnDecl>,
    ) -> Result<Option<HeartbeatMethod>, Vec<Error>> {
        let heartbeat_fn_decls: Vec<_> = annotated_fn_decls
            .iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(CanisterMethodType::Heartbeat)
            })
            .collect();

        if heartbeat_fn_decls.len() > 1 {
            let duplicate_method_types_error: Error =
                DuplicateSystemMethod::from_annotated_fn_decls(
                    heartbeat_fn_decls,
                    CanisterMethodType::Heartbeat,
                )
                .into();

            return Err(vec![duplicate_method_types_error]);
        }

        let heartbeat_fn_decl_option = heartbeat_fn_decls.get(0);

        if let Some(heartbeat_fn_decl) = heartbeat_fn_decl_option {
            heartbeat_fn_decl.assert_return_type_is_void();

            let body = rust::generate(heartbeat_fn_decl);
            let guard_function_name = heartbeat_fn_decl.annotation.guard.clone();
            Ok(Some(HeartbeatMethod {
                body,
                guard_function_name,
            }))
        } else {
            Ok(None)
        }
    }
}
