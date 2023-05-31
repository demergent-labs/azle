use cdk_framework::{act::CanisterMethods, traits::CollectResults};

use crate::{plugin::Plugin, ts_ast::TsAst, Error};

pub use annotated_fn_decl::{AnnotatedFnDecl, GetAnnotatedFnDecls};
pub use annotation::Annotation;

pub mod annotated_fn_decl;
mod annotation;
pub mod check_length_and_map;
mod heartbeat;
mod init;
mod inspect_message;
mod module_item;
mod post_upgrade;
mod pre_upgrade;
mod query_and_update;
mod rust;

pub mod errors;
pub mod module;

impl TsAst {
    pub fn build_canister_methods(
        &self,
        plugins: &Vec<Plugin>,
        environment_variables: &Vec<(String, String)>,
    ) -> Result<CanisterMethods, Vec<Error>> {
        let (annotated_fn_decls, get_annotated_fn_decls_errors) =
            self.programs.get_annotated_fn_decls();

        let build_canister_methods_result = (
            self.build_heartbeat_method(&annotated_fn_decls),
            self.build_init_method(&annotated_fn_decls, plugins, environment_variables),
            self.build_inspect_message_method(&annotated_fn_decls),
            self.build_post_upgrade_method(&annotated_fn_decls, plugins, environment_variables),
            self.build_pre_upgrade_method(&annotated_fn_decls),
            self.build_query_methods(&annotated_fn_decls),
            self.build_update_methods(&annotated_fn_decls),
        )
            .collect_results();

        match build_canister_methods_result {
            Ok(canister_methods) => {
                if !get_annotated_fn_decls_errors.is_empty() {
                    return Err(get_annotated_fn_decls_errors);
                }

                let (
                    heartbeat_method,
                    init_method,
                    inspect_message_method,
                    post_upgrade_method,
                    pre_upgrade_method,
                    query_methods,
                    update_methods,
                ) = canister_methods;

                Ok(CanisterMethods {
                    heartbeat_method,
                    init_method: Some(init_method),
                    inspect_message_method,
                    post_upgrade_method: Some(post_upgrade_method),
                    pre_upgrade_method,
                    query_methods,
                    update_methods,
                })
            }
            Err(errors) => Err(vec![get_annotated_fn_decls_errors, errors].concat()),
        }
    }
}
