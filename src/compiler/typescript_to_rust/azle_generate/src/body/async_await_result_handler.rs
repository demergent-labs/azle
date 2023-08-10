use cdk_framework::{
    act::{
        abstract_canister_tree::{convert_module_path_to_name, Module},
        node::{canister_method::QueryOrUpdateMethod, Context},
    },
    traits::ToTypeAnnotation,
};
use proc_macro2::TokenStream;
use quote::quote;

use crate::ts_keywords;

pub fn generate(modules: &Vec<Module>) -> TokenStream {
    let methods = modules.iter().fold(vec![], |acc, module| {
        let module_name = convert_module_path_to_name(&module.path);

        let query_methods = &module.canister_methods.query_methods;
        let update_methods = &module.canister_methods.update_methods;

        let query_or_update_methods = vec![
            query_methods
                .iter()
                .map(|query_method| {
                    (
                        QueryOrUpdateMethod::Query(query_method.clone()),
                        module_name.clone(),
                    )
                })
                .collect::<Vec<_>>(),
            update_methods
                .iter()
                .map(|update_methods| {
                    (
                        QueryOrUpdateMethod::Update(update_methods.clone()),
                        module_name.clone(),
                    )
                })
                .collect::<Vec<_>>(),
        ]
        .concat();

        vec![acc, query_or_update_methods].concat()
    });

    let match_arms = generate_match_arms(&methods);

    quote! {
        pub fn async_await_result_handler(
            boa_context: &mut boa_engine::Context,
            boa_return_value: &boa_engine::JsValue,
            uuid: &str,
            method_name: &str,
            manual: bool,
        ) -> Result<boa_engine::JsValue, String> {
            let boa_return_value_object = match boa_return_value.as_object() {
                Some(object) => object,
                None => return Ok(boa_return_value.clone()),
            };

            if !boa_return_value_object.is_promise() {
                return Ok(boa_return_value.clone());
            }

            boa_context.run_jobs();

            let js_promise = boa_engine::object::builtins::JsPromise::from_object(
                boa_return_value_object.clone(),
            )
            .map_err(|js_error| js_error.to_std_string(&mut *boa_context))?;

            let state = js_promise
                .state()
                .map_err(|js_error| js_error.to_std_string(&mut *boa_context))?;

            return match &state {
                boa_engine::builtins::promise::PromiseState::Fulfilled(js_value) => {
                    crate::PROMISE_MAP_REF_CELL.with(|promise_map_ref_cell| {
                        let mut promise_map = promise_map_ref_cell.borrow_mut();

                        promise_map.remove(uuid);
                    });

                    if manual == true {
                        return Ok(boa_return_value.clone());
                    }

                    match method_name {
                        #(#match_arms)*
                        "_AZLE_TIMER" => {}
                        _ => {
                            return Err(format!(
                                "\nUncaught ReferenceError: {} is not defined",
                                method_name
                            ))
                        }
                    };

                    return Ok(boa_return_value.clone());
                }
                boa_engine::builtins::promise::PromiseState::Rejected(js_value) => {
                    crate::PROMISE_MAP_REF_CELL.with(|promise_map_ref_cell| {
                        let mut promise_map = promise_map_ref_cell.borrow_mut();

                        promise_map.remove(uuid);
                    });

                    return Err(js_value.clone().to_std_string(&mut *boa_context));
                }
                boa_engine::builtins::promise::PromiseState::Pending => {
                    crate::PROMISE_MAP_REF_CELL.with(|promise_map_ref_cell| {
                        let mut promise_map = promise_map_ref_cell.borrow_mut();

                        promise_map.insert(uuid.to_string(), boa_return_value.clone());
                    });

                    return Ok(boa_return_value.clone());
                }
            };
        }
    }
}

fn generate_match_arms(methods: &Vec<(QueryOrUpdateMethod, String)>) -> Vec<TokenStream> {
    methods
        .iter()
        .filter(|method| method.0.is_async)
        .map(|method| generate_match_arm(&method.0, &method.1))
        .collect()
}

fn generate_match_arm(method: &QueryOrUpdateMethod, module_name: &str) -> TokenStream {
    let name = &method.name;
    let return_type = method.return_type.to_type_annotation(
        &Context {
            keyword_list: ts_keywords::ts_keywords(),
            cdk_name: "azle".to_string(),
        },
        name.clone(),
        &Some(module_name.to_string()),
    );

    quote!(
        #name => {
            let reply_value: (#return_type) = js_value
                .clone()
                .try_from_vm_value(&mut *boa_context)
                .map_err(|js_error: boa_engine::JsError| {
                    js_error.to_std_string(&mut *boa_context)
                })?;

            ic_cdk::api::call::reply((reply_value,));
        }
    )
}
