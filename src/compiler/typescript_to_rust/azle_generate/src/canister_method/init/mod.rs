use cdk_framework::act::node::canister_method::{CanisterMethodType, InitMethod};

use super::AnnotatedFnDecl;
use crate::{
    canister_method::errors::{AsyncNotAllowed, DuplicateSystemMethod},
    plugin::Plugin,
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
        let mut errors: Vec<Error> = vec![];

        let init_fn_decls: Vec<_> = annotated_fn_decls
            .iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(CanisterMethodType::Init)
            })
            .collect();

        if init_fn_decls.len() > 1 {
            let duplicate_method_types_error: Error =
                DuplicateSystemMethod::from_annotated_fn_decls(
                    &init_fn_decls,
                    CanisterMethodType::Init,
                )
                .into();

            errors.push(duplicate_method_types_error);
        }

        let init_fn_decl_option = init_fn_decls.get(0);

        if let Some(init_fn_decl) = init_fn_decl_option {
            if let Err(err) = init_fn_decl.is_void() {
                errors.push(err);
            }

            if init_fn_decl.fn_decl.function.is_async {
                errors.push(AsyncNotAllowed::from_annotated_fn_decl(init_fn_decl).into())
            }
        }

        if errors.len() != 0 {
            return Err(errors);
        }

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
