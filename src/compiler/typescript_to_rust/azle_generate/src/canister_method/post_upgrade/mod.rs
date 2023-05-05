use cdk_framework::act::node::canister_method::{CanisterMethodType, PostUpgradeMethod};

use super::AnnotatedFnDecl;
use crate::{canister_method::errors::DuplicateSystemMethod, plugin::Plugin, Error, TsAst};

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

        if post_upgrade_fn_decls.len() > 1 {
            let duplicate_method_types_error: Error =
                DuplicateSystemMethod::from_annotated_fn_decls(
                    post_upgrade_fn_decls,
                    CanisterMethodType::PostUpgrade,
                )
                .into();

            return Err(vec![duplicate_method_types_error]);
        }

        let post_upgrade_fn_decl_option = post_upgrade_fn_decls.get(0);

        if let Some(fn_decl) = post_upgrade_fn_decl_option {
            fn_decl.assert_return_type_is_void();
            fn_decl.assert_not_async();
        }

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
