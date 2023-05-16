use cdk_framework::act::node::canister_method::{CanisterMethodType, PostUpgradeMethod};

use super::{
    errors::{AsyncNotAllowed, VoidReturnTypeRequired},
    AnnotatedFnDecl,
};
use crate::{
    canister_method::errors::DuplicateSystemMethod, plugin::Plugin, traits::PartitionMap, Error,
    TsAst,
};

mod rust;

impl TsAst {
    pub fn build_post_upgrade_method(
        &self,
        annotated_fn_decls: &Vec<AnnotatedFnDecl>,
        plugins: &Vec<Plugin>,
        environment_variables: &Vec<(String, String)>,
    ) -> Result<PostUpgradeMethod, Vec<Error>> {
        let post_upgrade_fn_decls: Vec<_> = annotated_fn_decls
            .iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(CanisterMethodType::PostUpgrade)
            })
            .collect();

        let (valid_post_upgrade_fn_decls, individual_canister_method_errors) =
            <Vec<&AnnotatedFnDecl> as PartitionMap<&AnnotatedFnDecl, Error>>::partition_map(
                &post_upgrade_fn_decls,
                |post_upgrade_fn_decl| -> Result<&AnnotatedFnDecl, Vec<Error>> {
                    let errors = match post_upgrade_fn_decl.is_void() {
                        true => {
                            vec![VoidReturnTypeRequired::from_annotated_fn_decl(
                                post_upgrade_fn_decl,
                            )
                            .into()]
                        }
                        false => vec![],
                    };

                    let errors = match post_upgrade_fn_decl.fn_decl.function.is_async {
                        true => vec![
                            errors,
                            vec![
                                AsyncNotAllowed::from_annotated_fn_decl(post_upgrade_fn_decl)
                                    .into(),
                            ],
                        ]
                        .concat(),
                        false => errors,
                    };

                    if !errors.is_empty() {
                        return Err(errors);
                    }

                    Ok(post_upgrade_fn_decl)
                },
            );

        let err_values = individual_canister_method_errors
            .into_iter()
            .flatten()
            .collect();

        let all_errors = if post_upgrade_fn_decls.len() > 1 {
            let duplicate_method_types_error: Error =
                DuplicateSystemMethod::from_annotated_fn_decls(
                    &post_upgrade_fn_decls.clone(),
                    CanisterMethodType::Init,
                )
                .into();

            vec![vec![duplicate_method_types_error], err_values].concat()
        } else {
            err_values
        };

        if all_errors.len() > 0 {
            return Err(all_errors);
        }

        let post_upgrade_fn_decl_option = valid_post_upgrade_fn_decls.get(0);
        let params = if let Some(fn_decl) = post_upgrade_fn_decl_option {
            fn_decl.build_params()
        } else {
            vec![]
        };

        let body = rust::generate(
            post_upgrade_fn_decl_option.copied(),
            plugins,
            environment_variables,
        );
        let guard_function_name = None; // Unsupported. See https://github.com/demergent-labs/azle/issues/954

        Ok(PostUpgradeMethod {
            body,
            params,
            guard_function_name,
        })
    }
}
