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

            _azle_handle_boa_result(_azle_boa_context.eval(format!(
                "let exports = {{}}; {compiled_js}",
                compiled_js = STABLE_STORAGE_JS
            )), &mut _azle_boa_context);

            let _azle_stable_storage_result: Result<(String,), _> = ic_cdk::storage::stable_restore();

            let _azle_stable_storage = match _azle_stable_storage_result {
                Ok(_azle_stable_storage) => {
                    let _azle_stable_storage_json_string = _azle_stable_storage.0;

                    let _azle_stable_storage_deserialize_exports_js_value = _azle_handle_boa_result(_azle_boa_context.eval("exports"), &mut _azle_boa_context);
                    let _azle_stable_storage_deserialize_exports_js_object = _azle_stable_storage_deserialize_exports_js_value.as_object().unwrap();

                    let _azle_stable_storage_deserialize_function_js_value = _azle_stable_storage_deserialize_exports_js_object.get("stable_storage_deserialize", &mut _azle_boa_context).unwrap();
                    let _azle_stable_storage_deserialize_function_js_object = _azle_stable_storage_deserialize_function_js_value.as_object().unwrap();

                    _azle_handle_boa_result(_azle_stable_storage_deserialize_function_js_object.call(
                        &boa_engine::JsValue::Null,
                        &[
                            _azle_stable_storage_json_string.try_into_vm_value(&mut _azle_boa_context).unwrap()
                        ],
                        &mut _azle_boa_context
                    ), &mut _azle_boa_context)
                },
                Err(err) => {
                    ic_cdk::println!("{:#?}", err);

                    // TODO be careful, the error here is being swalloed
                    // TODO there might be legitimate errors coming from stable storage, but we ignore them
                    // TODO to the user the data stored in stable storage will just be replaced with an empty object...
                    // TODO would it be better to panic in those situations?
                    boa_engine::object::ObjectInitializer::new(&mut _azle_boa_context).build().into()
                }
            };

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
