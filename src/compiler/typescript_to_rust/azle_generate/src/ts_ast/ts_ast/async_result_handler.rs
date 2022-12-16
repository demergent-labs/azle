use cdk_framework::{ActCanisterMethod, ToTokenStream};
use proc_macro2::TokenStream;
use quote::{format_ident, quote};
use syn::Ident;

use super::TsAst;
use crate::generators::cross_canister_call_functions::CrossCanisterCallFunctionsInfo;
use crate::ts_keywords;

enum AzleCallType {
    WithoutPayment,
    WithPayment,
    WithPayment128,
}

impl TsAst {
    pub fn generate_async_result_handler(
        &self,
        canister_methods: &Vec<ActCanisterMethod>,
    ) -> TokenStream {
        let cross_canister_call_functions_infos =
            self.generate_cross_canister_call_functions_infos();

        let async_result_handler_call = generate_async_result_handler_call(
            &cross_canister_call_functions_infos,
            &AzleCallType::WithoutPayment,
        );

        let async_result_handler_call_with_payment = generate_async_result_handler_call(
            &cross_canister_call_functions_infos,
            &AzleCallType::WithPayment,
        );

        let async_result_handler_call_with_payment128 = generate_async_result_handler_call(
            &cross_canister_call_functions_infos,
            &AzleCallType::WithPayment128,
        );

        let match_arms = generate_match_arms(canister_methods);

        quote! {
            enum AzleCallRawType {
                U64,
                U128
            }

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
                            ic_cdk::println!("boa_engine::builtins::promise::PromiseState::Fulfilled");

                            match _azle_method_name {
                                #(#match_arms)*
                                _ => panic!("This cannot happen")
                            };

                            return _azle_boa_return_value.clone();
                        },
                        boa_engine::builtins::promise::PromiseState::Rejected(js_value) => {
                            // TODO handle rejections
                            panic!("boa_engine::builtins::promise::PromiseState::Rejected");
                        },
                        boa_engine::builtins::promise::PromiseState::Pending => {
                            ic_cdk::println!("boa_engine::builtins::promise::PromiseState::Pending");

                            PROMISE_MAP_REF_CELL.with(|promise_map_ref_cell| {
                                let mut promise_map = promise_map_ref_cell.borrow_mut();

                                promise_map.insert(_azle_uuid.to_string(), _azle_boa_return_value.clone().into());
                            });

                            return _azle_boa_return_value.clone();
                        }
                    };
                }
                else {
                    return _azle_boa_return_value.clone();
                }
            }

            #[async_recursion::async_recursion(?Send)]
            async fn _azle_async_result_handler(
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
                            ic_cdk::println!("boa_engine::builtins::promise::PromiseState::Fulfilled");

                            match _azle_method_name {
                                #(#match_arms)*
                                _ => panic!("This cannot happen")
                            };

                            return boa_engine::JsValue::Null;
                        },
                        boa_engine::builtins::promise::PromiseState::Rejected(js_value) => {
                            // TODO handle rejections
                            panic!("boa_engine::builtins::promise::PromiseState::Rejected");
                        },
                        boa_engine::builtins::promise::PromiseState::Pending => {
                            ic_cdk::println!("boa_engine::builtins::promise::PromiseState::Pending");

                            PROMISE_MAP_REF_CELL.with(|promise_map_ref_cell| {
                                let mut promise_map = promise_map_ref_cell.borrow_mut();

                                promise_map.insert(_azle_uuid.to_string(), _azle_boa_return_value.clone().into());
                            });

                            return boa_engine::JsValue::Null;
                        }
                    };
                }

                if
                    _azle_boa_return_value.is_object() == false ||
                    _azle_boa_return_value.as_object().unwrap().is_generator() == false
                {
                    return _azle_boa_return_value.clone();
                }

                let _azle_generator_object = _azle_boa_return_value.as_object().unwrap();

                let _azle_next_js_value = _azle_generator_object.get("next", _azle_boa_context).unwrap();
                let _azle_next_js_object = _azle_next_js_value.as_object().unwrap();

                let mut _azle_continue_running = true;
                let mut _azle_args: Vec<boa_engine::JsValue> = vec![];

                // let mut _azle_final_js_value = boa_engine::JsValue::Undefined; // TODO this will probably break down below
                let mut _azle_final_js_value = boa_engine::JsValue::from("hello"); // TODO this will probably break down below

                while _azle_continue_running == true {
                    let yield_result_js_value = _azle_handle_boa_result(_azle_next_js_object.call(&_azle_boa_return_value, &_azle_args[..], _azle_boa_context), _azle_boa_context);
                    let yield_result_js_object = yield_result_js_value.as_object().unwrap();

                    let yield_result_done_js_value = yield_result_js_object.get("done", _azle_boa_context).unwrap();
                    let yield_result_done_bool = yield_result_done_js_value.as_boolean().unwrap();

                    let yield_result_value_js_value = yield_result_js_object.get("value", _azle_boa_context).unwrap();

                    if yield_result_done_bool == false {
                        let yield_result_value_js_object = yield_result_value_js_value.as_object().unwrap();

                        if yield_result_value_js_object.is_generator() {
                            let recursed_generator_js_value = _azle_async_result_handler(
                                _azle_boa_context,
                                &yield_result_value_js_value,
                                _azle_uuid,
                                _azle_method_name
                            ).await;

                            _azle_args = vec![recursed_generator_js_value];

                            continue;
                        }

                        let name_js_value = yield_result_value_js_object.get("name", _azle_boa_context).unwrap();
                        let name_string: String = name_js_value.try_from_vm_value(&mut *_azle_boa_context).unwrap();

                        match &name_string[..] {
                            "call" => {
                                let call_args_js_value = yield_result_value_js_object.get("args", _azle_boa_context).unwrap();
                                let call_args_js_object = call_args_js_value.as_object().unwrap();

                                let call_function_name_js_value = call_args_js_object.get("0", _azle_boa_context).unwrap();
                                let call_function_name_string: String = call_function_name_js_value.try_from_vm_value(&mut *_azle_boa_context).unwrap();

                                let canister_result_js_value = _azle_async_result_handler_call(
                                    _azle_boa_context,
                                    &call_function_name_string,
                                    &call_args_js_object
                                ).await;

                                _azle_args = vec![canister_result_js_value];
                            },
                            "call_with_payment" => {
                                let call_args_js_value = yield_result_value_js_object.get("args", _azle_boa_context).unwrap();
                                let call_args_js_object = call_args_js_value.as_object().unwrap();

                                let call_function_name_js_value = call_args_js_object.get("0", _azle_boa_context).unwrap();
                                let call_function_name_string: String = call_function_name_js_value.try_from_vm_value(&mut *_azle_boa_context).unwrap();

                                let canister_result_js_value = _azle_async_result_handler_call_with_payment(
                                    _azle_boa_context,
                                    &call_function_name_string,
                                    &call_args_js_object
                                ).await;

                                _azle_args = vec![canister_result_js_value];
                            },
                            "call_with_payment128" => {
                                let call_args_js_value = yield_result_value_js_object.get("args", _azle_boa_context).unwrap();
                                let call_args_js_object = call_args_js_value.as_object().unwrap();

                                let call_function_name_js_value = call_args_js_object.get("0", _azle_boa_context).unwrap();
                                let call_function_name_string: String = call_function_name_js_value.try_from_vm_value(&mut *_azle_boa_context).unwrap();

                                let canister_result_js_value = _azle_async_result_handler_call_with_payment128(
                                    _azle_boa_context,
                                    &call_function_name_string,
                                    &call_args_js_object
                                ).await;

                                _azle_args = vec![canister_result_js_value];
                            },
                            "call_raw" => {
                                let canister_result_js_value = _azle_async_result_handler_call_raw(
                                    _azle_boa_context,
                                    &yield_result_value_js_object,
                                    AzleCallRawType::U64
                                ).await;

                                _azle_args = vec![canister_result_js_value];
                            },
                            "call_raw128" => {
                                let canister_result_js_value = _azle_async_result_handler_call_raw(
                                    _azle_boa_context,
                                    &yield_result_value_js_object,
                                    AzleCallRawType::U128
                                ).await;

                                _azle_args = vec![canister_result_js_value];
                            },
                            _ => {}
                        };
                    }
                    else {
                        _azle_final_js_value = yield_result_value_js_value;
                        _azle_continue_running = false;
                    }
                }

                _azle_final_js_value
            }

            #async_result_handler_call
            #async_result_handler_call_with_payment
            #async_result_handler_call_with_payment128

            async fn _azle_async_result_handler_call_raw(
                _azle_boa_context: &mut boa_engine::Context,
                yield_result_value_js_object: &boa_engine::object::JsObject,
                call_raw_type: AzleCallRawType
            ) -> boa_engine::JsValue {
                let call_args_js_value = yield_result_value_js_object.get("args", _azle_boa_context).unwrap();
                let call_args_js_object = call_args_js_value.as_object().unwrap();

                let canister_id_js_value = call_args_js_object.get("0", _azle_boa_context).unwrap();
                let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.try_from_vm_value(&mut *_azle_boa_context).unwrap();

                let method_js_value = call_args_js_object.get("1", _azle_boa_context).unwrap();
                let method_string: String = method_js_value.try_from_vm_value(&mut *_azle_boa_context).unwrap();

                let args_raw_js_value = call_args_js_object.get("2", _azle_boa_context).unwrap();
                let args_raw_vec: Vec<u8> = args_raw_js_value.try_from_vm_value(&mut *_azle_boa_context).unwrap();

                let payment_js_value = call_args_js_object.get("3", _azle_boa_context).unwrap();

                let call_result = match call_raw_type {
                    AzleCallRawType::U64 => {
                        ic_cdk::api::call::call_raw(
                            canister_id_principal,
                            &method_string,
                            &args_raw_vec,
                            payment_js_value.try_from_vm_value(&mut *_azle_boa_context).unwrap()
                        ).await
                    },
                    AzleCallRawType::U128 => {
                        ic_cdk::api::call::call_raw128(
                            canister_id_principal,
                            &method_string,
                            &args_raw_vec,
                            payment_js_value.try_from_vm_value(&mut *_azle_boa_context).unwrap()
                        ).await
                    }
                };

                match call_result {
                    Ok(value) => {
                        let js_value = value.try_into_vm_value(_azle_boa_context).unwrap();

                        let canister_result_js_object = boa_engine::object::ObjectInitializer::new(_azle_boa_context)
                            .property(
                                "ok",
                                js_value,
                                boa_engine::property::Attribute::all()
                            )
                            .build();

                        let canister_result_js_value = canister_result_js_object.into();

                        canister_result_js_value
                    },
                    Err(err) => {
                        let js_value = format!("Rejection code {rejection_code}, {error_message}", rejection_code = (err.0 as i32).to_string(), error_message = err.1).try_into_vm_value(_azle_boa_context).unwrap();

                        let canister_result_js_object = boa_engine::object::ObjectInitializer::new(_azle_boa_context)
                            .property(
                                "err",
                                js_value,
                                boa_engine::property::Attribute::all()
                            )
                            .build();

                        let canister_result_js_value = canister_result_js_object.into();

                        canister_result_js_value
                    }
                }
            }
        }
    }
}

fn generate_async_result_handler_call(
    cross_canister_call_functions_infos: &Vec<CrossCanisterCallFunctionsInfo>,
    azle_call_type: &AzleCallType,
) -> TokenStream {
    let match_arms: Vec<TokenStream> = cross_canister_call_functions_infos
        .iter()
        .map(|cross_canister_call_functions_info| {
            let (cross_canister_call_function_name, cross_canister_call_function_name_ident) = generate_async_result_handler_function_name_info(
                cross_canister_call_functions_info,
                azle_call_type
            );

            let params_variables: Vec<TokenStream> = cross_canister_call_functions_info.call.rust_params.param_names.iter().enumerate().map(|(index, param_name)| {
                let param_name_js_value = format_ident!("{}_js_value", param_name.to_string());
                let param_type = &cross_canister_call_functions_info.call.rust_params.param_types[index];

                let index_string = (index + 2).to_string();

                quote! {
                    let #param_name_js_value = call_args_js_object.get(#index_string, _azle_boa_context).unwrap();
                    let #param_name: #param_type = #param_name_js_value.try_from_vm_value(&mut *_azle_boa_context).unwrap();
                }
            }).collect();

            let param_names = &cross_canister_call_functions_info.call.rust_params.param_names;

            let cycles_variables = match azle_call_type {
                AzleCallType::WithoutPayment => quote! {},
                AzleCallType::WithPayment => {
                    let index_string = (param_names.len() + 2).to_string();

                    quote! {
                        let cycles_js_value = call_args_js_object.get(#index_string, _azle_boa_context).unwrap();
                        let cycles: u64 = cycles_js_value.try_from_vm_value(&mut *_azle_boa_context).unwrap();
                    }
                },
                AzleCallType::WithPayment128 => {
                    let index_string = (param_names.len() + 2).to_string();

                    quote! {
                        let cycles_js_value = call_args_js_object.get(#index_string, _azle_boa_context).unwrap();
                        let cycles: u128 = cycles_js_value.try_from_vm_value(&mut *_azle_boa_context).unwrap();
                    }
                }
            };

            let trailing_comma = if param_names.len() == 1 { quote! {,} } else { quote! { } };

            let cycles_ident = match azle_call_type {
                AzleCallType::WithPayment | AzleCallType::WithPayment128 => quote! { cycles },
                _ => quote! {}
            };

            quote! {
                #cross_canister_call_function_name => {
                    let canister_id_js_value = call_args_js_object.get("1", _azle_boa_context).unwrap();
                    let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.try_from_vm_value(&mut *_azle_boa_context).unwrap();

                    #(#params_variables)*

                    #cycles_variables

                    let call_result = #cross_canister_call_function_name_ident(
                        canister_id_principal,
                        (#(#param_names),* #trailing_comma),
                        #cycles_ident
                    ).await;

                    match call_result {
                        Ok(value) => {
                            let js_value = value.0.try_into_vm_value(_azle_boa_context).unwrap();

                            let canister_result_js_object = boa_engine::object::ObjectInitializer::new(_azle_boa_context)
                                .property(
                                    "ok",
                                    js_value,
                                    boa_engine::property::Attribute::all()
                                )
                                .build();

                            let canister_result_js_value = canister_result_js_object.into();

                            canister_result_js_value
                        },
                        Err(err) => {
                            let js_value = format!("Rejection code {rejection_code}, {error_message}", rejection_code = (err.0 as i32).to_string(), error_message = err.1).try_into_vm_value(_azle_boa_context).unwrap();

                            let canister_result_js_object = boa_engine::object::ObjectInitializer::new(_azle_boa_context)
                                .property(
                                    "err",
                                    js_value,
                                    boa_engine::property::Attribute::all()
                                )
                                .build();

                            let canister_result_js_value = canister_result_js_object.into();

                            canister_result_js_value
                        }
                    }
                }
            }
        })
        .collect();

    let azle_async_result_handler_call_name = match azle_call_type {
        AzleCallType::WithoutPayment => format_ident!("{}", "_azle_async_result_handler_call"),
        AzleCallType::WithPayment => {
            format_ident!("{}", "_azle_async_result_handler_call_with_payment")
        }
        AzleCallType::WithPayment128 => {
            format_ident!("{}", "_azle_async_result_handler_call_with_payment128")
        }
    };

    quote! {
        async fn #azle_async_result_handler_call_name(
            _azle_boa_context: &mut boa_engine::Context,
            call_function_name_string: &str,
            call_args_js_object: &boa_engine::object::JsObject
        ) -> boa_engine::JsValue {
            match &call_function_name_string[..] {
                #(#match_arms),*
                _ => panic!("cross canister call function does not exist")
            }
        }
    }
}

fn generate_async_result_handler_function_name_info(
    cross_canister_call_functions_info: &CrossCanisterCallFunctionsInfo,
    azle_call_type: &AzleCallType,
) -> (String, Ident) {
    match azle_call_type {
        AzleCallType::WithoutPayment => {
            let cross_canister_call_function_name = &cross_canister_call_functions_info.call.name;
            let cross_canister_call_function_name_ident =
                format_ident!("{}", cross_canister_call_function_name);

            (
                cross_canister_call_function_name.clone(),
                cross_canister_call_function_name_ident,
            )
        }
        AzleCallType::WithPayment => {
            let cross_canister_call_function_name =
                &cross_canister_call_functions_info.call_with_payment.name;
            let cross_canister_call_function_name_ident =
                format_ident!("{}", cross_canister_call_function_name);

            (
                cross_canister_call_function_name.clone(),
                cross_canister_call_function_name_ident,
            )
        }
        AzleCallType::WithPayment128 => {
            let cross_canister_call_function_name =
                &cross_canister_call_functions_info.call_with_payment128.name;
            let cross_canister_call_function_name_ident =
                format_ident!("{}", cross_canister_call_function_name);

            (
                cross_canister_call_function_name.clone(),
                cross_canister_call_function_name_ident,
            )
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
