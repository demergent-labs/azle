use crate::{
    generators::canister_methods::inspect_message,
    ts_ast::{azle_program::HelperMethods, ts_ast::errors, TsAst},
};
use cdk_framework::{nodes::ActInspectMessageMethod, CanisterMethodType};

pub fn build_canister_method_system_inspect_message(
    ts_ast: &TsAst,
) -> Option<ActInspectMessageMethod> {
    let inspect_message_fn_decls = ts_ast
        .azle_programs
        .get_azle_fn_decls_of_type(&CanisterMethodType::InspectMessage);

    if inspect_message_fn_decls.len() > 1 {
        let error_message = errors::create_duplicate_method_types_error_message(
            inspect_message_fn_decls,
            CanisterMethodType::InspectMessage,
        );

        panic!("{}", error_message);
    }

    let inspect_message_fn_decl_option = inspect_message_fn_decls.get(0);

    if let Some(inspect_message_fn_decl) = inspect_message_fn_decl_option {
        let body = inspect_message::generate_inspect_message_method_body(inspect_message_fn_decl);

        Some(ActInspectMessageMethod { body })
    } else {
        None
    }
}
