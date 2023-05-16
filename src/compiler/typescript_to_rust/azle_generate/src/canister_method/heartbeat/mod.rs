use cdk_framework::{
    act::node::canister_method::{CanisterMethodType, HeartbeatMethod},
    traits::CollectResults,
};

use super::{errors::VoidReturnTypeRequired, AnnotatedFnDecl, CheckLengthAndMapForAnnFnDecl};
use crate::{Error, TsAst};

mod rust;

impl TsAst {
    pub fn build_heartbeat_method(
        &self,
        annotated_fn_decls: &Vec<AnnotatedFnDecl>,
    ) -> Result<Option<HeartbeatMethod>, Vec<Error>> {
        let heartbeat_methods = annotated_fn_decls
            .iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(CanisterMethodType::Heartbeat)
            })
            .collect::<Vec<_>>()
            .check_length_and_map(CanisterMethodType::Heartbeat, |heartbeat_fn_decl| {
                if heartbeat_fn_decl.is_void() {
                    Err(vec![VoidReturnTypeRequired::from_annotated_fn_decl(
                        heartbeat_fn_decl,
                    )
                    .into()])
                } else {
                    let body = rust::generate(heartbeat_fn_decl);
                    let guard_function_name = heartbeat_fn_decl.annotation.guard.clone();
                    Ok(HeartbeatMethod {
                        body,
                        guard_function_name,
                    })
                }
            })
            .collect_results()?;

        Ok(heartbeat_methods.get(0).cloned())
    }
}
