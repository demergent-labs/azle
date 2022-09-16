use crate::cdk_act::generators::ic_object::generate_ic_object;
use crate::{
    cdk_act::CanisterMethodType,
    generators::canister_methods::{
        functions::{
            generate_param_name_idents, generate_param_types, generate_params_token_stream,
        },
        method_body::generate_call_to_js_function,
    },
    ts_ast,
};
use quote::quote;
use swc_ecma_ast::{FnDecl, Program};

pub fn generate_canister_method_system_post_upgrade(
    programs: &Vec<Program>,
) -> proc_macro2::TokenStream {
    let ic_object = generate_ic_object(programs);

    let post_upgrade_fn_decls = ts_ast::program::get_canister_method_type_fn_decls(
        programs,
        &CanisterMethodType::PostUpgrade,
    );

    if post_upgrade_fn_decls.len() > 1 {
        panic!("Only one PostUpgrade function can be defined");
    }

    let post_upgrade_fn_decl_option = post_upgrade_fn_decls.get(0);

    let post_upgrade_params = generate_post_upgrade_params(&post_upgrade_fn_decl_option);

    let call_to_post_upgrade_js_function =
        generate_call_to_post_upgrade_js_function(&post_upgrade_fn_decl_option);

    quote! {
        #[ic_cdk_macros::post_upgrade]
        fn _azle_post_upgrade(#(#post_upgrade_params),*) {
            unsafe {
                BOA_CONTEXT_OPTION = Some(boa_engine::Context::default());
                let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                _azle_boa_context.eval(format!(
                    "let exports = {{}}; {compiled_js}",
                    compiled_js = STABLE_STORAGE_JS
                )).unwrap();

                let _azle_stable_storage: (String,) = ic_cdk::storage::stable_restore().unwrap();
                let _azle_stable_storage_json_string = _azle_stable_storage.0;

                let _azle_stable_storage_deserialize_exports_js_value = _azle_boa_context.eval("exports").unwrap();
                let _azle_stable_storage_deserialize_exports_js_object = _azle_stable_storage_deserialize_exports_js_value.as_object().unwrap();

                let _azle_stable_storage_deserialize_function_js_value = _azle_stable_storage_deserialize_exports_js_object.get("stable_storage_deserialize", &mut _azle_boa_context).unwrap();
                let _azle_stable_storage_deserialize_function_js_object = _azle_stable_storage_deserialize_function_js_value.as_object().unwrap();

                let _azle_stable_storage = _azle_stable_storage_deserialize_function_js_object.call(
                    &boa_engine::JsValue::Null,
                    &[
                        _azle_stable_storage_json_string.azle_into_js_value(&mut _azle_boa_context)
                    ],
                    &mut _azle_boa_context
                ).unwrap();

                #ic_object

                _azle_boa_context.register_global_property(
                    "ic",
                    ic,
                    boa_engine::property::Attribute::all()
                );

                _azle_boa_context.eval(format!(
                    "{compiled_js}",
                    compiled_js = MAIN_JS
                )).unwrap();

                #call_to_post_upgrade_js_function
            }
        }
    }
}

fn generate_post_upgrade_params(
    post_upgrade_fn_decl_option: &Option<&FnDecl>,
) -> Vec<proc_macro2::TokenStream> {
    if let Some(post_upgrade_fn_decl) = post_upgrade_fn_decl_option {
        // TODO this part should be refactored to allow us to get a params data structure by just passing in a &FnDecl
        // TODO that params data structures can have the name, the type, and both strings and idents as necessary
        let param_name_idents = generate_param_name_idents(&post_upgrade_fn_decl);
        let param_types = generate_param_types(&post_upgrade_fn_decl);
        let params = generate_params_token_stream(&param_name_idents, &param_types);

        params
    } else {
        vec![]
    }
}

fn generate_call_to_post_upgrade_js_function(
    post_upgrade_fn_decl_option: &Option<&FnDecl>,
) -> proc_macro2::TokenStream {
    if let Some(post_upgrade_fn_decl) = post_upgrade_fn_decl_option {
        generate_call_to_js_function(post_upgrade_fn_decl)
    } else {
        quote!()
    }
}
