use swc_ecma_ast::Program;

use crate::{
    cdk_act::{nodes::ActInspectMessageMethodNode, CanisterMethodType},
    generators::canister_methods::method_body,
    ts_ast::{fn_decl::FnDeclHelperMethods, program::TsProgramVecHelperMethods},
};

pub fn build_canister_method_system_inspect_message(
    programs: &Vec<Program>,
) -> Option<ActInspectMessageMethodNode> {
    let inspect_message_fn_decls =
        programs.get_fn_decls_of_type(&CanisterMethodType::InspectMessage);

    if inspect_message_fn_decls.len() > 1 {
        panic!("Only one InspectMessage function can be defined");
    }

    let inspect_message_fn_decl_option = inspect_message_fn_decls.get(0);

    if let Some(inspect_message_fn_decl) = inspect_message_fn_decl_option {
        let name = inspect_message_fn_decl.get_fn_decl_function_name();

        let call_to_inspect_message_js_function =
            method_body::generate_call_to_js_function(inspect_message_fn_decl);

        let body = quote::quote! {
            unsafe {
                let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                #call_to_inspect_message_js_function
            }
        };
        Some(ActInspectMessageMethodNode { name, body })
    } else {
        None
    }
}
