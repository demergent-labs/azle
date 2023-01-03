use quote::quote;

use crate::{
    generators::canister_methods::method_body,
    ts_ast::{azle_program::HelperMethods, ts_ast::errors, TsAst},
};
use cdk_framework::{
    nodes::ActPostUpgradeMethod, traits::CanisterMethodBuilder, CanisterMethodType,
};

pub fn build_canister_method_system_post_upgrade(ts_ast: &TsAst) -> ActPostUpgradeMethod {
    let ic_object = ts_ast.generate_ic_object();

    let post_upgrade_fn_decls = ts_ast
        .azle_programs
        .get_azle_fn_decls_of_type(&CanisterMethodType::PostUpgrade);

    if post_upgrade_fn_decls.len() > 1 {
        let error_message = errors::create_duplicate_method_types_error_message(
            post_upgrade_fn_decls,
            CanisterMethodType::PostUpgrade,
        );

        panic!("{}", error_message);
    }

    let post_upgrade_fn_decl_option = post_upgrade_fn_decls.get(0);

    let params = if let Some(fn_decl) = post_upgrade_fn_decl_option {
        fn_decl.build_params()
    } else {
        vec![]
    };

    let call_to_post_upgrade_js_function =
        method_body::maybe_generate_call_to_js_function(&post_upgrade_fn_decl_option);

    let function_name = match post_upgrade_fn_decl_option {
        Some(post_upgrade_fn_decl) => post_upgrade_fn_decl.get_function_name(),
        None => "DOES_NOT_EXIST".to_string(),
    };

    let body = quote! {
        BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
            let mut _azle_boa_context = box_context_ref_cell.borrow_mut();

            METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                let mut method_name_mut = method_name_ref_cell.borrow_mut();

                *method_name_mut = #function_name.to_string()
            });

            _azle_handle_boa_result(
                _azle_boa_context.eval("let exports = {};".to_string()),
                &mut _azle_boa_context
            );

            #ic_object

            _azle_boa_context.register_global_property(
                "ic",
                ic,
                boa_engine::property::Attribute::all()
            );

            _azle_handle_boa_result(_azle_boa_context.eval(format!(
                "{compiled_js}",
                compiled_js = MAIN_JS
            )), &mut _azle_boa_context);

            #call_to_post_upgrade_js_function
        });
    };

    ActPostUpgradeMethod { body, params }
}
