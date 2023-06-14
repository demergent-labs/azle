use cdk_framework::{
    act::node::canister_method::{CanisterMethodType, PostUpgradeMethod},
    traits::CollectResults,
};

use super::{
    check_length_and_map::CheckLengthAndMapTwo,
    errors::{AsyncNotAllowed, DuplicateSystemMethod, VoidReturnTypeRequired},
    AnnotatedFnDecl,
};
use crate::{plugin::Plugin, ts_ast::SourceMapped, Error, TsAst};

mod rust;

impl TsAst {
    pub fn build_post_upgrade_method(
        &self,
        annotated_fn_decls: &Vec<SourceMapped<AnnotatedFnDecl>>,
        plugins: &Vec<Plugin>,
        environment_variables: &Vec<(String, String)>,
    ) -> Result<PostUpgradeMethod, Vec<Error>> {
        let post_upgrade_fn_decls: Vec<_> = annotated_fn_decls
            .iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(CanisterMethodType::PostUpgrade)
            })
            .collect();
        let post_upgrade_method_option = post_upgrade_fn_decls
            .check_length_and_map(
                post_upgrade_fn_decls.len() <= 1,
                |fn_decls| {
                    DuplicateSystemMethod::from_annotated_fn_decls(
                        fn_decls,
                        CanisterMethodType::PostUpgrade,
                    )
                    .into()
                },
                |post_upgrade_fn_decl| {
                    let (_, _, params, body) = (
                        match post_upgrade_fn_decl.is_void() {
                            true => Ok(()),
                            false => {
                                Err(vec![VoidReturnTypeRequired::error_from_annotated_fn_decl(
                                    post_upgrade_fn_decl,
                                )])
                            }
                        },
                        match post_upgrade_fn_decl.fn_decl.function.is_async {
                            true => Err(vec![AsyncNotAllowed::error_from_annotated_fn_decl(
                                post_upgrade_fn_decl,
                            )
                            .into()]),
                            false => Ok(()),
                        },
                        post_upgrade_fn_decl.build_params(),
                        rust::generate(Some(post_upgrade_fn_decl), plugins, environment_variables),
                    )
                        .collect_results()?;

                    let guard_function_name = None; // Unsupported. See https://github.com/demergent-labs/azle/issues/954

                    Ok(PostUpgradeMethod {
                        body,
                        params,
                        guard_function_name,
                    })
                },
            )
            .collect_results()?
            .pop();

        match post_upgrade_method_option {
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
