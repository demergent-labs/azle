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
            .check_length_and_map(CanisterMethodType::PostUpgrade, |post_upgrade_fn_decl| {
                let errors = match post_upgrade_fn_decl.is_void() {
                    true => {
                        vec![
                            VoidReturnTypeRequired::from_annotated_fn_decl(post_upgrade_fn_decl)
                                .into(),
                        ]
                    }
                    false => vec![],
                };

                let errors = match post_upgrade_fn_decl.fn_decl.function.is_async {
                    true => vec![
                        errors,
                        vec![AsyncNotAllowed::from_annotated_fn_decl(post_upgrade_fn_decl).into()],
                    ]
                    .concat(),
                    false => errors,
                };

                if !errors.is_empty() {
                    return Err(errors);
                }

                Ok(post_upgrade_fn_decl.clone())
            })
            .collect_results()?;

        let post_upgrade_fn_decl_option = valid_post_upgrade_fn_decls.get(0).cloned();
        let params = if let Some(fn_decl) = &post_upgrade_fn_decl_option {
            fn_decl.build_params()
        } else {
            vec![]
        };

        let body = rust::generate(post_upgrade_fn_decl_option, plugins, environment_variables);
        let guard_function_name = None; // Unsupported. See https://github.com/demergent-labs/azle/issues/954

        Ok(PostUpgradeMethod {
            body,
            params,
            guard_function_name,
        })
    }
}
