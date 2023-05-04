use cdk_framework::act::node::canister_method::{CanisterMethodType, InitMethod};

use crate::{
    canister_method::{errors, GetAnnotatedFnDecls},
    plugin::Plugin,
    TsAst,
};

mod rust;

impl TsAst {
    pub fn build_init_method(
        &self,
        plugins: &Vec<Plugin>,
        environment_variables: &Vec<(String, String)>,
    ) -> InitMethod {
        let init_fn_decls = self
            .programs
            .get_annotated_fn_decls_of_type(CanisterMethodType::Init);

        if init_fn_decls.len() > 1 {
            let error_message =
                errors::build_duplicate_method_types_error_message_from_annotated_fn_decl(
                    init_fn_decls,
                    CanisterMethodType::Init,
                );

            panic!("{}", error_message);
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

        InitMethod {
            params,
            body,
            guard_function_name,
        }
    }
}
