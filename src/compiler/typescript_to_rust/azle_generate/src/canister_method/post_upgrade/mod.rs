use cdk_framework::{
    act::node::canister_method::{CanisterMethodType, PostUpgradeMethod},
    traits::CollectResults,
};

use super::{
    errors::{AsyncNotAllowed, VoidReturnTypeRequired},
    AnnotatedFnDecl, CheckLengthAndMap,
};
use crate::{plugin::Plugin, Error, TsAst};

mod rust;

impl TsAst {
    pub fn build_post_upgrade_method(
        &self,
        annotated_fn_decls: &Vec<AnnotatedFnDecl>,
        plugins: &Vec<Plugin>,
        environment_variables: &Vec<(String, String)>,
    ) -> Result<PostUpgradeMethod, Vec<Error>> {
        let valid_post_upgrade_fn_decls = annotated_fn_decls
            .iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(CanisterMethodType::PostUpgrade)
            })
            .collect::<Vec<_>>()
            .check_length_and_map(CanisterMethodType::PostUpgrade, |post_upgrade_fn_decl| {
                let errors = match post_upgrade_fn_decl.is_void() {
                    true => vec![],
                    false => {
                        VoidReturnTypeRequired::error_from_annotated_fn_decl(post_upgrade_fn_decl)
                            .into()
                    }
                };

                let errors = match post_upgrade_fn_decl.fn_decl.function.is_async {
                    true => vec![
                        errors,
                        AsyncNotAllowed::error_from_annotated_fn_decl(post_upgrade_fn_decl).into(),
                    ]
                    .concat(),
                    false => errors,
                };

                if !errors.is_empty() {
                    return Err(errors);
                }

                let params = post_upgrade_fn_decl.build_params()?; // TODO make sure these are collected with the above errors

                let body =
                    rust::generate(Some(post_upgrade_fn_decl), plugins, environment_variables)?;
                let guard_function_name = None; // Unsupported. See https://github.com/demergent-labs/azle/issues/954

                Ok(PostUpgradeMethod {
                    body,
                    params,
                    guard_function_name,
                })
            })
            .collect_results()?;

        let post_upgrade_fn_decl_option = valid_post_upgrade_fn_decls.get(0).cloned();

        match post_upgrade_fn_decl_option {
            Some(post_upgrade_method) => Ok(post_upgrade_method),
            None => {
                Ok(PostUpgradeMethod {
                    params: vec![],
                    body: rust::generate(None, plugins, environment_variables)?,
                    guard_function_name: None, // Unsupported. See https://github.com/demergent-labs/azle/issues/954,
                })
            }
        }
    }
}
