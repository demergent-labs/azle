use cdk_framework::{
    act::node::canister_method::{CanisterMethodType, PreUpgradeMethod},
    traits::CollectResults,
};

use super::{
    errors::{AsyncNotAllowed, VoidReturnTypeRequired},
    AnnotatedFnDecl, CheckLengthAndMap,
};
use crate::{Error, TsAst};

mod rust;

impl TsAst {
    pub fn build_pre_upgrade_method(
        &self,
        annotated_fn_decls: &Vec<AnnotatedFnDecl>,
    ) -> Result<Option<PreUpgradeMethod>, Vec<Error>> {
        let pre_upgrade_methods = annotated_fn_decls
            .iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(CanisterMethodType::PreUpgrade)
            })
            .collect::<Vec<_>>()
            .check_length_and_map(CanisterMethodType::PreUpgrade, |pre_upgrade_fn_decl| {
                let (_, _, body) = (
                    match pre_upgrade_fn_decl.is_void() {
                        true => Ok(()),
                        false => Err(vec![VoidReturnTypeRequired::error_from_annotated_fn_decl(
                            pre_upgrade_fn_decl,
                        )]),
                    },
                    match pre_upgrade_fn_decl.fn_decl.function.is_async {
                        true => Err(vec![AsyncNotAllowed::error_from_annotated_fn_decl(
                            pre_upgrade_fn_decl,
                        )]),
                        false => Ok(()),
                    },
                    rust::generate(pre_upgrade_fn_decl),
                )
                    .collect_results()?;

                let guard_function_name = pre_upgrade_fn_decl.annotation.guard.clone();

                Ok(PreUpgradeMethod {
                    body,
                    guard_function_name,
                })
            })
            .collect_results()?;

        Ok(pre_upgrade_methods.get(0).cloned())
    }
}
