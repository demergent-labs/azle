// TODO this is almost identical to generate_ic_object_function_call_raw
pub fn generate_ic_object_function_call_raw128() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_call_raw128(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let top_level_call_frame = &_context.vm.frames[0];
            let function_name_sym = top_level_call_frame.code.name;
            let function_name = _context.interner.resolve_expect(function_name_sym.clone()).to_string();

            // TODO make this promise in a better way once Boa allows it or you can figure it out
            let promise_js_value = _context.eval("new Promise(() => {})").unwrap();
            let promise_js_value_cloned = promise_js_value.clone();

            let canister_id: ic_cdk::export::Principal = _aargs.get(0).unwrap().clone().try_from_vm_value(&mut *_context).unwrap();
            let method: String = _aargs.get(1).unwrap().clone().try_from_vm_value(&mut *_context).unwrap();
            let args_raw: Vec<u8> = _aargs.get(2).unwrap().clone().try_from_vm_value(&mut *_context).unwrap();
            let payment: u128 = _aargs.get(3).unwrap().clone().try_from_vm_value(&mut *_context).unwrap();

            ic_cdk::spawn(async move {
                unsafe {
                    let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                    let uuid = UUID_REF_CELL.with(|uuid_ref_cell| uuid_ref_cell.borrow().clone());

                    let call_result = ic_cdk::api::call::call_raw128(canister_id, &method, &args_raw, payment).await;

                    UUID_REF_CELL.with(|uuid_ref_cell| {
                        let mut uuid_mut = uuid_ref_cell.borrow_mut();

                        *uuid_mut = uuid.clone();
                    });

                    let call_result_js_value = match call_result {
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
                    };

                    let promise_js_object = promise_js_value_cloned.as_object().unwrap();
                    let mut promise_object = promise_js_object.borrow_mut();
                    let mut promise = promise_object.as_promise_mut().unwrap();

                    promise.clone().fulfill_promise(&call_result_js_value, &mut *_azle_boa_context);

                    let main_promise = PROMISE_MAP_REF_CELL.with(|promise_map_ref_cell| {
                        let promise_map = promise_map_ref_cell.borrow().clone();

                        let main_promise = promise_map.get(&uuid).unwrap();

                        main_promise.clone()
                    });

                    _azle_async_result_handler(_azle_boa_context, &main_promise, &uuid, &function_name).await;
                }
            });

            Ok(promise_js_value)
        }
    }
}
