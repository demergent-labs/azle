pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn set_timer_interval(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let interval_js_value = aargs.get(0).unwrap().clone();
            let interval_as_u64: u64 = interval_js_value.try_from_vm_value(&mut *context).unwrap();
            let interval = core::time::Duration::new(interval_as_u64, 0);

            let func_js_value = aargs.get(1).unwrap();
            let func_js_object = func_js_value.as_object().unwrap().clone();

            let closure = move || {
                BOA_CONTEXT_REF_CELL.with(|boa_context_ref_cell| {
                    let mut boa_context = boa_context_ref_cell.borrow_mut();

                    let uuid = uuid::Uuid::new_v4().to_string();

                    UUID_REF_CELL.with(|uuid_ref_cell| {
                        let mut uuid_mut = uuid_ref_cell.borrow_mut();

                        *uuid_mut = uuid.clone();
                    });

                    METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                        let mut method_name_mut = method_name_ref_cell.borrow_mut();

                        *method_name_mut = "_AZLE_TIMER".to_string();
                    });

                    MANUAL_REF_CELL.with(|manual_ref_cell| {
                        let mut manual_mut = manual_ref_cell.borrow_mut();

                        *manual_mut = false;
                    });

                    let boa_return_value = unwrap_boa_result(
                        func_js_object.call(
                            &boa_engine::JsValue::Null,
                            &[],
                            &mut *boa_context
                        ),
                        &mut *boa_context
                    );

                    async_await_result_handler(
                        &mut boa_context,
                        &boa_return_value,
                        &uuid,
                        "_AZLE_TIMER",
                        false
                    );
                });
            };

            let timer_id = ic_cdk_timers::set_timer_interval(interval, closure);

            Ok(timer_id.try_into_vm_value(context).unwrap())
        }
    }
}
