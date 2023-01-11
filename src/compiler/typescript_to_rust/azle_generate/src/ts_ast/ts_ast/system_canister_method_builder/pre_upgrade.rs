use crate::{
    generators::canister_methods::method_body,
    ts_ast::{azle_program::HelperMethods, ts_ast::errors, TsAst},
};
use cdk_framework::{nodes::ActPreUpgradeMethod, CanisterMethodType};
use quote::quote;

pub fn build_canister_method_system_pre_upgrade(ts_ast: &TsAst) -> ActPreUpgradeMethod {
    let pre_upgrade_fn_decls = ts_ast
        .azle_programs
        .get_azle_fn_decls_of_type(&CanisterMethodType::PreUpgrade);

    if pre_upgrade_fn_decls.len() > 1 {
        let error_message = errors::create_duplicate_method_types_error_message(
            pre_upgrade_fn_decls,
            CanisterMethodType::PreUpgrade,
        );

        panic!("{}", error_message);
    }

    let pre_upgrade_fn_decl_option = pre_upgrade_fn_decls.get(0);

    let call_to_pre_upgrade_js_function =
        method_body::maybe_generate_call_to_js_function(&pre_upgrade_fn_decl_option);

    let function_name = match pre_upgrade_fn_decl_option {
        Some(pre_upgrade_fn_decl) => pre_upgrade_fn_decl.get_function_name(),
        None => "DOES_NOT_EXIST".to_string(),
    };

    let body = quote! {
        BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
            let mut _azle_boa_context = box_context_ref_cell.borrow_mut();

            METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                let mut method_name_mut = method_name_ref_cell.borrow_mut();

                *method_name_mut = #function_name.to_string()
            });

            #call_to_pre_upgrade_js_function
        })
    };

    ActPreUpgradeMethod { body }
}
