use cdk_framework::act::node::canister_method::{CanisterMethodType, InitMethod};

use super::{errors::VoidReturnTypeRequired, AnnotatedFnDecl};
use crate::{
    canister_method::errors::{AsyncNotAllowed, DuplicateSystemMethod},
    plugin::Plugin,
    traits::PartitionMap,
    Error, TsAst,
};

mod rust;

impl TsAst {
    pub fn build_init_method(
        &self,
        annotated_fn_decls: &Vec<AnnotatedFnDecl>,
        plugins: &Vec<Plugin>,
        environment_variables: &Vec<(String, String)>,
    ) -> Result<InitMethod, Vec<Error>> {
        let init_fn_decls: Vec<_> = annotated_fn_decls
            .iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(CanisterMethodType::Init)
            })
            .collect();

        let (valid_init_fn_decls, individual_canister_method_errors) =
            <Vec<&AnnotatedFnDecl> as PartitionMap<&AnnotatedFnDecl, Error>>::partition_map(
                &init_fn_decls,
                |init_fn_decl| -> Result<&AnnotatedFnDecl, Vec<Error>> {
                    let errors = match init_fn_decl.is_void() {
                        true => {
                            vec![VoidReturnTypeRequired::from_annotated_fn_decl(init_fn_decl).into()]
                        }
                        false => vec![],
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

                    Ok(init_fn_decl)
                },
            );

        let err_values = individual_canister_method_errors
            .into_iter()
            .flatten()
            .collect();

        let all_errors = if init_fn_decls.len() > 1 {
            let duplicate_method_types_error: Error =
                DuplicateSystemMethod::from_annotated_fn_decls(
                    &init_fn_decls.clone(),
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

        let init_fn_decl_option = valid_init_fn_decls.get(0);
        let params = if let Some(fn_decl) = init_fn_decl_option {
            fn_decl.build_params()
        } else {
            vec![]
        };
        let body = rust::generate(init_fn_decl_option.copied(), plugins, environment_variables);
        let guard_function_name = None; // Unsupported. See https://github.com/demergent-labs/azle/issues/954

        Ok(InitMethod {
            params,
            body,
            guard_function_name,
        })
    }
}
