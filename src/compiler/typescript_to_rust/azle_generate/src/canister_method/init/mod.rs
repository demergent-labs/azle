use cdk_framework::act::node::canister_method::{CanisterMethodType, InitMethod};

use crate::{
    canister_method::{errors::DuplicateSystemMethod, GetAnnotatedFnDecls},
    plugin::Plugin,
    Error, TsAst,
};

mod rust;

impl TsAst {
    pub fn build_init_method(
        &self,
        plugins: &Vec<Plugin>,
        environment_variables: &Vec<(String, String)>,
    ) -> Result<InitMethod, Vec<Error>> {
        let init_fn_decls = self
            .programs
            .get_annotated_fn_decls_of_type(CanisterMethodType::Init);

        if init_fn_decls.len() > 1 {
            let duplicate_method_types_error: Error =
                DuplicateSystemMethod::from_annotated_fn_decls(
                    init_fn_decls,
                    CanisterMethodType::Init,
                )
                .into();

            return Err(vec![duplicate_method_types_error]);
        }

        let init_fn_decl_option = init_fn_decls.get(0);

        if let Some(fn_decl) = init_fn_decl_option {
            fn_decl.assert_return_type_is_void();
            fn_decl.assert_not_async();
        }

        let params = if let Some(fn_decl) = init_fn_decl_option {
            fn_decl.build_params()
        } else {
            vec![]
        };

        let body = rust::generate(init_fn_decl_option, plugins, environment_variables);
        let guard_function_name = None; // Unsupported. See https://github.com/demergent-labs/azle/issues/954

        Ok(InitMethod {
            params,
            body,
            guard_function_name,
        })
    }
}
