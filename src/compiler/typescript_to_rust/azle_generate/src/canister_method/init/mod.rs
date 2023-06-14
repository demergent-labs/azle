use cdk_framework::{
    act::node::canister_method::{CanisterMethodType, InitMethod},
    traits::CollectResults,
};

use super::{
    check_length_and_map::CheckLengthAndMapTwo,
    errors::{DuplicateSystemMethod, VoidReturnTypeRequired},
    AnnotatedFnDecl,
};
use crate::{
    canister_method::errors::AsyncNotAllowed, plugin::Plugin, ts_ast::SourceMapped, Error, TsAst,
};

mod rust;

impl TsAst {
    pub fn build_init_method(
        &self,
        annotated_fn_decls: &Vec<SourceMapped<AnnotatedFnDecl>>,
        plugins: &Vec<Plugin>,
        environment_variables: &Vec<(String, String)>,
    ) -> Result<InitMethod, Vec<Error>> {
        let init_fn_decls: Vec<_> = annotated_fn_decls
            .iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(CanisterMethodType::Init)
            })
            .collect();
        let init_method_option = init_fn_decls
            .check_length_and_map(
                init_fn_decls.len() <= 1,
                |fn_decls| {
                    DuplicateSystemMethod::from_annotated_fn_decls(
                        &fn_decls,
                        CanisterMethodType::Init,
                    )
                    .into()
                },
                |init_fn_decl| {
                    let (_, _, params, body) = (
                        match init_fn_decl.is_void() {
                            true => Ok(()),
                            false => {
                                Err(vec![VoidReturnTypeRequired::error_from_annotated_fn_decl(
                                    init_fn_decl,
                                )])
                            }
                        },
                        match init_fn_decl.fn_decl.function.is_async {
                            true => Err(vec![AsyncNotAllowed::error_from_annotated_fn_decl(
                                init_fn_decl,
                            )]),
                            false => Ok(()),
                        },
                        init_fn_decl.build_params(),
                        rust::generate(Some(init_fn_decl), plugins, environment_variables),
                    )
                        .collect_results()?;

                    let guard_function_name = None; // Unsupported. See https://github.com/demergent-labs/azle/issues/954

                    Ok(InitMethod {
                        params,
                        body,
                        guard_function_name,
                    })
                },
            )
            .collect_results()?
            .pop();

        match init_method_option {
            Some(init_fn_decl) => Ok(init_fn_decl),
            None => {
                Ok(InitMethod {
                    params: vec![],
                    body: rust::generate(None, plugins, environment_variables)?,
                    guard_function_name: None, // Unsupported. See https://github.com/demergent-labs/azle/issues/954
                })
            }
        }
    }
}
