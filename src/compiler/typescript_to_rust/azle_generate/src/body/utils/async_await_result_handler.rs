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
        fn _azle_async_await_result_handler(
            _azle_boa_context: &mut boa_engine::Context,
            _azle_boa_return_value: &boa_engine::JsValue,
            _azle_uuid: &str,
            _azle_method_name: &str,
            _azle_manual: bool
        ) -> boa_engine::JsValue {
            if
                !_azle_boa_return_value.is_object() ||
                !_azle_boa_return_value.as_object().unwrap().is_promise()
            {
                return _azle_boa_return_value.clone();
            }

            // This runs all pending promises to completion
            // TODO use the better Boa API once it's available
            _azle_boa_context.eval("");

            let object = _azle_boa_return_value.as_object().unwrap().borrow();
            let promise = object.as_promise().unwrap();

            return match &promise.promise_state {
                boa_engine::builtins::promise::PromiseState::Fulfilled(js_value) => {
                    crate::ref_cells::PROMISE_MAP.with(|promise_map_ref_cell| {
                        let mut promise_map = promise_map_ref_cell.borrow_mut();

                        promise_map.remove(_azle_uuid);
                    });

                    if _azle_manual == true {
                        return _azle_boa_return_value.clone();
                    }

                    match _azle_method_name {
                        #(#match_arms)*
                        "_AZLE_TIMER" => {},
                        _ => panic!("method name was not found")
                    };

                    return _azle_boa_return_value.clone();
                },
                boa_engine::builtins::promise::PromiseState::Rejected(js_value) => {
                    crate::ref_cells::PROMISE_MAP.with(|promise_map_ref_cell| {
                        let mut promise_map = promise_map_ref_cell.borrow_mut();

                        promise_map.remove(_azle_uuid);
                    });

                    let error_message = _azle_js_value_to_string(js_value.clone(), _azle_boa_context);

                    ic_cdk::api::trap(&format!("Uncaught {}", error_message));
                },
                boa_engine::builtins::promise::PromiseState::Pending => {
                    crate::ref_cells::PROMISE_MAP.with(|promise_map_ref_cell| {
                        let mut promise_map = promise_map_ref_cell.borrow_mut();

                        promise_map.insert(_azle_uuid.to_string(), _azle_boa_return_value.clone());
                    });

                    return _azle_boa_return_value.clone();
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
            let reply_value: #return_type = js_value.clone().try_from_vm_value(&mut *_azle_boa_context).unwrap();
            ic_cdk::api::call::reply((reply_value,));
        }
    )
}
