use cdk_framework::{
    act::node::canister_method::{CanisterMethodType, HeartbeatMethod},
    traits::CollectResults,
};

use super::{
    check_length_and_map::CheckLengthAndMapTwo,
    errors::{DuplicateSystemMethod, VoidReturnTypeRequired},
    AnnotatedFnDecl,
};
use crate::{ts_ast::SourceMapped, Error, TsAst};

mod rust;

impl TsAst {
    pub fn build_heartbeat_method(
        &self,
        annotated_fn_decls: &Vec<SourceMapped<AnnotatedFnDecl>>,
    ) -> Result<Option<HeartbeatMethod>, Vec<Error>> {
        let heartbeat_fn_decls: Vec<_> = annotated_fn_decls
            .iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(CanisterMethodType::Heartbeat)
            })
            .collect();
        Ok(heartbeat_fn_decls
            .check_length_and_map(
                heartbeat_fn_decls.len() <= 1,
                |fn_decls| {
                    DuplicateSystemMethod::from_annotated_fn_decls(
                        &fn_decls,
                        CanisterMethodType::Heartbeat,
                    )
                    .into()
                },
                |heartbeat_fn_decl| {
                    if !heartbeat_fn_decl.is_void() {
                        Err(
                            VoidReturnTypeRequired::error_from_annotated_fn_decl(heartbeat_fn_decl)
                                .into(),
                        )
                    } else {
                        let body = rust::generate(heartbeat_fn_decl)?;
                        let guard_function_name = heartbeat_fn_decl.annotation.guard.clone();
                        Ok(HeartbeatMethod {
                            body,
                            guard_function_name,
                        })
                    }
                },
            )
            .collect_results()?
            .pop())
    }
}
