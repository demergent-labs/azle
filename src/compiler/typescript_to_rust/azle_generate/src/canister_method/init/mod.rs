use cdk_framework::{
    act::node::canister_method::{CanisterMethodType, InitMethod},
    traits::CollectResults,
};

use super::{errors::VoidReturnTypeRequired, AnnotatedFnDecl, CheckLengthAndMap};
use crate::{canister_method::errors::AsyncNotAllowed, plugin::Plugin, Error, TsAst};

mod rust;

impl TsAst {
    pub fn build_init_method(
        &self,
        annotated_fn_decls: &Vec<AnnotatedFnDecl>,
        plugins: &Vec<Plugin>,
        environment_variables: &Vec<(String, String)>,
    ) -> Result<InitMethod, Vec<Error>> {
        let valid_init_fn_decls = annotated_fn_decls
            .iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(CanisterMethodType::Init)
            })
            .collect::<Vec<_>>()
            .check_length_and_map(CanisterMethodType::Init, |init_fn_decl| {
                let errors = match init_fn_decl.is_void() {
                    true => vec![],
                    false => {
                        vec![VoidReturnTypeRequired::from_annotated_fn_decl(init_fn_decl).into()]
                    }
                };

                let errors = match init_fn_decl.fn_decl.function.is_async {
                    true => vec![
                        errors,
                        vec![AsyncNotAllowed::from_annotated_fn_decl(init_fn_decl).into()],
                    ]
                    .concat(),
                    false => errors,
                };

                if !errors.is_empty() {
                    return Err(errors);
                }

                let params = init_fn_decl.build_params();
                let body = rust::generate(Some(init_fn_decl), plugins, environment_variables);
                let guard_function_name = None; // Unsupported. See https://github.com/demergent-labs/azle/issues/954

                Ok(InitMethod {
                    params,
                    body,
                    guard_function_name,
                })
            })
            .collect_results()?;

        let init_fn_decl_option = valid_init_fn_decls.get(0).cloned();

        match init_fn_decl_option {
            Some(init_fn_decl) => Ok(init_fn_decl),
            None => {
                Ok(InitMethod {
                    params: vec![],
                    body: rust::generate(None, plugins, environment_variables),
                    guard_function_name: None, // Unsupported. See https://github.com/demergent-labs/azle/issues/954
                })
            }
        }
    }
}
