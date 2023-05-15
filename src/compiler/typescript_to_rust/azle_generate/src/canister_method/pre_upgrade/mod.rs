use cdk_framework::act::node::canister_method::{CanisterMethodType, PreUpgradeMethod};

use super::{errors::AsyncNotAllowed, AnnotatedFnDecl};
use crate::{canister_method::errors::DuplicateSystemMethod, Error, TsAst};

mod rust;

impl TsAst {
    pub fn build_pre_upgrade_method(
        &self,
        annotated_fn_decls: &Vec<AnnotatedFnDecl>,
    ) -> Result<Option<PreUpgradeMethod>, Vec<Error>> {
        let mut errors: Vec<Error> = vec![];

        let pre_upgrade_fn_decls: Vec<_> = annotated_fn_decls
            .iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(CanisterMethodType::PreUpgrade)
            })
            .collect();

        if pre_upgrade_fn_decls.len() > 1 {
            let duplicate_method_types_error: Error =
                DuplicateSystemMethod::from_annotated_fn_decls(
                    &pre_upgrade_fn_decls,
                    CanisterMethodType::PreUpgrade,
                )
                .into();

            errors.push(duplicate_method_types_error);
        }

        if let Some(pre_upgrade_fn_decl) = pre_upgrade_fn_decls.get(0) {
            if let Err(err) = pre_upgrade_fn_decl.is_void() {
                errors.push(err);
            }

            if pre_upgrade_fn_decl.fn_decl.function.is_async {
                errors.push(AsyncNotAllowed::from_annotated_fn_decl(pre_upgrade_fn_decl).into())
            }

            if errors.len() != 0 {
                return Err(errors);
            }

            let body = rust::generate(pre_upgrade_fn_decl);
            let guard_function_name = pre_upgrade_fn_decl.annotation.guard.clone();

            Ok(Some(PreUpgradeMethod {
                body,
                guard_function_name,
            }))
        } else {
            Ok(None)
        }
    }
}
