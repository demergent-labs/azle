use quote::quote;

pub fn generate_async_result_handler() -> proc_macro2::TokenStream {
    quote! {
        enum AzleCallRawType {
            U64,
            U128
        }

        #[async_recursion::async_recursion(?Send)]
        async fn _azle_async_result_handler(
            _azle_boa_context: &mut boa_engine::Context,
            _azle_boa_return_value: &boa_engine::JsValue
        ) -> boa_engine::JsValue {
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
                let yield_result_js_value = _azle_next_js_object.call(&_azle_boa_return_value, &_azle_args[..], _azle_boa_context).unwrap();
                let yield_result_js_object = yield_result_js_value.as_object().unwrap();

                let yield_result_done_js_value = yield_result_js_object.get("done", _azle_boa_context).unwrap();
                let yield_result_done_bool = yield_result_done_js_value.as_boolean().unwrap();

                let yield_result_value_js_value = yield_result_js_object.get("value", _azle_boa_context).unwrap();

                if yield_result_done_bool == false {
                    let yield_result_value_js_object = yield_result_value_js_value.as_object().unwrap();

                    if yield_result_value_js_object.is_generator() {
                        let recursed_generator_js_value = _azle_async_result_handler(
                            _azle_boa_context,
                            &yield_result_value_js_value
                        ).await;

                        _azle_args = vec![recursed_generator_js_value];

                        continue;
                    }

                    let name_js_value = yield_result_value_js_object.get("name", _azle_boa_context).unwrap();
                    let name_string = name_js_value.as_string().unwrap();

                    match &name_string[..] {
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

        async fn _azle_async_result_handler_call_raw(
            _azle_boa_context: &mut boa_engine::Context,
            yield_result_value_js_object: &boa_engine::object::JsObject,
            call_raw_type: AzleCallRawType
        ) -> boa_engine::JsValue {
            let call_args_js_value = yield_result_value_js_object.get("args", _azle_boa_context).unwrap();
            let call_args_js_object = call_args_js_value.as_object().unwrap();

            let canister_id_js_value = call_args_js_object.get("0", _azle_boa_context).unwrap();
            let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.azle_try_from_js_value(_azle_boa_context).unwrap();

            let method_js_value = call_args_js_object.get("1", _azle_boa_context).unwrap();
            let method_string = method_js_value.as_string().unwrap().to_string();

            let args_raw_js_value = call_args_js_object.get("2", _azle_boa_context).unwrap();
            let args_raw_vec: Vec<u8> = args_raw_js_value.azle_try_from_js_value(_azle_boa_context).unwrap();

            let payment_js_value = call_args_js_object.get("3", _azle_boa_context).unwrap();

            let call_result = match call_raw_type {
                AzleCallRawType::U64 => {
                    ic_cdk::api::call::call_raw(
                        canister_id_principal,
                        &method_string,
                        &args_raw_vec,
                        payment_js_value.azle_try_from_js_value(_azle_boa_context).unwrap()
                    ).await
                },
                AzleCallRawType::U128 => {
                    ic_cdk::api::call::call_raw128(
                        canister_id_principal,
                        &method_string,
                        &args_raw_vec,
                        payment_js_value.azle_try_from_js_value(_azle_boa_context).unwrap()
                    ).await
                }
            };

            match call_result {
                Ok(value) => {
                    let js_value = value.azle_into_js_value(_azle_boa_context);

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
                    let js_value = format!("Rejection code {rejection_code}, {error_message}", rejection_code = (err.0 as i32).to_string(), error_message = err.1).azle_into_js_value(_azle_boa_context);

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
