use cdk_framework::{ActCanisterMethod, ToTokenStream};
use proc_macro2::TokenStream;
use quote::quote;

use super::TsAst;
use crate::ts_keywords;

impl TsAst {
    pub fn generate_async_result_handler(
        &self,
        canister_methods: &Vec<ActCanisterMethod>,
    ) -> TokenStream {
        let match_arms = generate_match_arms(canister_methods);
        quote! {
            fn _azle_async_await_result_handler(
                _azle_boa_context: &mut boa_engine::Context,
                _azle_boa_return_value: &boa_engine::JsValue,
                _azle_uuid: &str,
                _azle_method_name: &str
            ) -> boa_engine::JsValue {
                if
                    _azle_boa_return_value.is_object() == true &&
                    _azle_boa_return_value.as_object().unwrap().is_promise() == true
                {
                    // This runs all pending promises to completion
                    // TODO use the better Boa API once it's available
                    _azle_boa_context.eval("");

                    let object = _azle_boa_return_value.as_object().unwrap().borrow();
                    let promise = object.as_promise().unwrap();

                    return match &promise.promise_state {
                        boa_engine::builtins::promise::PromiseState::Fulfilled(js_value) => {
                            PROMISE_MAP_REF_CELL.with(|promise_map_ref_cell| {
                                let mut promise_map = promise_map_ref_cell.borrow_mut();

                                promise_map.remove(_azle_uuid);
                            });

                            match _azle_method_name {
                                #(#match_arms)*
                                _ => panic!("This cannot happen")
                            };

                            return _azle_boa_return_value.clone();
                        },
                        boa_engine::builtins::promise::PromiseState::Rejected(js_value) => {
                            PROMISE_MAP_REF_CELL.with(|promise_map_ref_cell| {
                                let mut promise_map = promise_map_ref_cell.borrow_mut();

                                promise_map.remove(_azle_uuid);
                            });

                            let error_message = _azle_handle_boa_error(js_value.clone(), _azle_boa_context);

                            panic!("Azle runtime error: {}", error_message);
                        },
                        boa_engine::builtins::promise::PromiseState::Pending => {
                            PROMISE_MAP_REF_CELL.with(|promise_map_ref_cell| {
                                let mut promise_map = promise_map_ref_cell.borrow_mut();

                                promise_map.insert(_azle_uuid.to_string(), _azle_boa_return_value.clone());
                            });

                            return _azle_boa_return_value.clone();
                        }
                    };
                }
                else {
                    return _azle_boa_return_value.clone();
                }
            }
        }
    }
}

fn generate_match_arms(canister_methods: &Vec<ActCanisterMethod>) -> Vec<TokenStream> {
    canister_methods
        .iter()
        .filter(|canister_method| canister_method.is_promise())
        .map(|canister_method| generate_match_arm(canister_method))
        .collect()
}

fn generate_match_arm(canister_method: &ActCanisterMethod) -> TokenStream {
    let name = &canister_method.get_name();
    let return_type = &canister_method
        .get_return_type()
        .to_token_stream(&ts_keywords::ts_keywords());
    quote!(
        #name => {
            let reply_value: #return_type = js_value.clone().try_from_vm_value(&mut *_azle_boa_context).unwrap();
            ic_cdk::api::call::reply((reply_value,));
        }
    )
}
