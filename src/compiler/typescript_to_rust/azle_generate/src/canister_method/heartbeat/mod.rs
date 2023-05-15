use cdk_framework::act::node::canister_method::{CanisterMethodType, HeartbeatMethod};

use super::{errors::VoidReturnTypeRequired, AnnotatedFnDecl};
use crate::{canister_method::errors::DuplicateSystemMethod, traits::PartitionMap, Error, TsAst};

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

        let (ok_values, err_values) = <Vec<&AnnotatedFnDecl> as PartitionMap<
            &AnnotatedFnDecl,
            Error,
        >>::partition_map(
            &heartbeat_fn_decls,
            |heartbeat_fn_decl| -> Result<HeartbeatMethod, Error> {
                if heartbeat_fn_decl.is_void() {
                    Err(VoidReturnTypeRequired::from_annotated_fn_decl(heartbeat_fn_decl).into())
                } else {
                    let body = rust::generate(heartbeat_fn_decl);
                    let guard_function_name = heartbeat_fn_decl.annotation.guard.clone();
                    Ok(HeartbeatMethod {
                        body,
                        guard_function_name,
                    })
                }
            },
        );

        let all_errors = if heartbeat_fn_decls.len() > 1 {
            let duplicate_method_types_error: Error =
                DuplicateSystemMethod::from_annotated_fn_decls(
                    &heartbeat_fn_decls.clone(),
                    CanisterMethodType::Heartbeat,
                )
                .into();

            vec![vec![duplicate_method_types_error], err_values].concat()
        } else {
            err_values
        };

        if all_errors.len() > 0 {
            return Err(all_errors);
        }

        Ok(ok_values.get(0).cloned())
    }
}
