use quote::quote;

use crate::{
    cdk_act::{nodes::ActPostUpgradeMethod, traits::CanisterMethodBuilder, CanisterMethodType},
    generators::canister_methods::method_body,
    ts_ast::{program::azle_program::AzleProgramVecHelperMethods, ts_ast::errors, TsAst},
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

    let body = quote! {
        unsafe {
            BOA_CONTEXT_OPTION = Some(boa_engine::Context::default());
            let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

            handle_boa_result(_azle_boa_context.eval(format!(
                "let exports = {{}}; {compiled_js}",
                compiled_js = STABLE_STORAGE_JS
            )), &mut _azle_boa_context);

            let _azle_stable_storage: (String,) = ic_cdk::storage::stable_restore().unwrap();
            let _azle_stable_storage_json_string = _azle_stable_storage.0;

            let _azle_stable_storage_deserialize_exports_js_value = handle_boa_result(_azle_boa_context.eval("exports"), &mut _azle_boa_context);
            let _azle_stable_storage_deserialize_exports_js_object = _azle_stable_storage_deserialize_exports_js_value.as_object().unwrap();

            let _azle_stable_storage_deserialize_function_js_value = _azle_stable_storage_deserialize_exports_js_object.get("stable_storage_deserialize", &mut _azle_boa_context).unwrap();
            let _azle_stable_storage_deserialize_function_js_object = _azle_stable_storage_deserialize_function_js_value.as_object().unwrap();

            let _azle_stable_storage = handle_boa_result(_azle_stable_storage_deserialize_function_js_object.call(
                &boa_engine::JsValue::Null,
                &[
                    _azle_stable_storage_json_string.try_into_vm_value(&mut _azle_boa_context)
                ],
                &mut _azle_boa_context
            ), &mut _azle_boa_context);

            #ic_object

            _azle_boa_context.register_global_property(
                "ic",
                ic,
                boa_engine::property::Attribute::all()
            );

            handle_boa_result(_azle_boa_context.eval(format!(
                "{compiled_js}",
                compiled_js = MAIN_JS
            )), &mut _azle_boa_context);

            #call_to_post_upgrade_js_function
        }
    };

    ActPostUpgradeMethod { body, params }
}
