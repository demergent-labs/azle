use cdk_framework::{
    act::node::{canister_method::QueryOrUpdateMethod, Context},
    traits::ToTypeAnnotation,
};
use proc_macro2::TokenStream;
use quote::quote;

use crate::ts_keywords;

pub fn generate(methods: &Vec<QueryOrUpdateMethod>) -> TokenStream {
    let match_arms = generate_match_arms(methods);
    quote! {
        fn async_await_result_handler(
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
                    PROMISE_MAP_REF_CELL.with(|promise_map_ref_cell| {
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
                    PROMISE_MAP_REF_CELL.with(|promise_map_ref_cell| {
                        let mut promise_map = promise_map_ref_cell.borrow_mut();

                        promise_map.remove(uuid);
                    });

                    return Err(js_value.clone().to_std_string(&mut *boa_context));
                }
                boa_engine::builtins::promise::PromiseState::Pending => {
                    PROMISE_MAP_REF_CELL.with(|promise_map_ref_cell| {
                        let mut promise_map = promise_map_ref_cell.borrow_mut();

                        promise_map.insert(uuid.to_string(), boa_return_value.clone());
                    });

                    return Ok(boa_return_value.clone());
                }
            };
        }
    }
}

fn generate_match_arms(methods: &Vec<QueryOrUpdateMethod>) -> Vec<TokenStream> {
    methods
        .iter()
        .filter(|method| method.is_async)
        .map(|method| generate_match_arm(method))
        .collect()
}

fn generate_match_arm(method: &QueryOrUpdateMethod) -> TokenStream {
    let name = &method.name;
    let return_type = method.return_type.to_type_annotation(
        &Context {
            keyword_list: ts_keywords::ts_keywords(),
            cdk_name: "azle".to_string(),
        },
        name.clone(),
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
