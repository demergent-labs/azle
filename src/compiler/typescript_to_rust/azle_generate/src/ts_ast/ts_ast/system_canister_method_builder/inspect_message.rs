use crate::{
    generators::canister_methods::method_body,
    ts_ast::{program::azle_program::AzleProgramVecHelperMethods, ts_ast::errors, TsAst},
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
        let call_to_inspect_message_js_function =
            method_body::generate_call_to_js_function(inspect_message_fn_decl);

        let function_name = inspect_message_fn_decl.get_function_name();

        let body = quote::quote! {
            BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
                let mut _azle_boa_context = box_context_ref_cell.borrow_mut();

                METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                    let mut method_name_mut = method_name_ref_cell.borrow_mut();

                    *method_name_mut = #function_name.to_string()
                });

                #call_to_inspect_message_js_function
            });
        };
        Some(ActInspectMessageMethod { body })
    } else {
        None
    }
}
