use cdk_framework::act::node::canister_method::{CanisterMethodType, PreUpgradeMethod};

use super::{
    errors::{AsyncNotAllowed, VoidReturnTypeRequired},
    AnnotatedFnDecl,
};
use crate::{canister_method::errors::DuplicateSystemMethod, traits::PartitionMap, Error, TsAst};

mod rust;

impl TsAst {
    pub fn build_pre_upgrade_method(
        &self,
        annotated_fn_decls: &Vec<AnnotatedFnDecl>,
    ) -> Result<Option<PreUpgradeMethod>, Vec<Error>> {
        let pre_upgrade_fn_decls: Vec<_> = annotated_fn_decls
            .iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(CanisterMethodType::PreUpgrade)
            })
            .collect();

        let (pre_upgrade_methods, individual_canister_method_errors) =
            <Vec<&AnnotatedFnDecl> as PartitionMap<&AnnotatedFnDecl, Error>>::partition_map(
                &pre_upgrade_fn_decls,
                |pre_upgrade_fn_decl| -> Result<PreUpgradeMethod, Vec<Error>> {
                    let errors = match pre_upgrade_fn_decl.is_void() {
                        true => {
                            vec![VoidReturnTypeRequired::from_annotated_fn_decl(
                                pre_upgrade_fn_decl,
                            )
                            .into()]
                        }
                        false => vec![],
                    };

                    let errors = match pre_upgrade_fn_decl.fn_decl.function.is_async {
                        true => vec![
                            errors,
                            vec![
                                AsyncNotAllowed::from_annotated_fn_decl(pre_upgrade_fn_decl).into()
                            ],
                        ]
                        .concat(),
                        false => errors,
                    };

                    if !errors.is_empty() {
                        return Err(errors);
                    }

                    let body = rust::generate(pre_upgrade_fn_decl);
                    let guard_function_name = pre_upgrade_fn_decl.annotation.guard.clone();

                    Ok(PreUpgradeMethod {
                        body,
                        guard_function_name,
                    })
                },
            );

        let err_values = individual_canister_method_errors
            .into_iter()
            .flatten()
            .collect();

        let all_errors = if pre_upgrade_fn_decls.len() > 1 {
            let duplicate_method_types_error: Error =
                DuplicateSystemMethod::from_annotated_fn_decls(
                    &pre_upgrade_fn_decls.clone(),
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

        Ok(pre_upgrade_methods.get(0).cloned())
    }
}
