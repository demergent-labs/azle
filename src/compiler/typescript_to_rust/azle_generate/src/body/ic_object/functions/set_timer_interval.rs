pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn set_timer_interval(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let interval_js_value = aargs
                .get(0)
                .ok_or_else(|| "An argument for 'interval' was not provided".to_js_error(None))?
                .clone();
            let func_js_value = aargs
                .get(1)
                .ok_or_else(|| "An argument for 'callback' was not provided".to_js_error(None))?;

            let interval_as_u64: u64 = interval_js_value.try_from_vm_value(&mut *context)?;
            let interval = core::time::Duration::new(interval_as_u64, 0);

            if !func_js_value.is_callable() {
                return Err("TypeError: 'callback' is not a function".to_js_error(None));
            }

            let func_js_object = func_js_value
                .as_object()
                .ok_or_else(|| "TypeError: 'callback' is not a function".to_js_error(None))?
                .clone();

            let closure = move || {
                crate::BOA_CONTEXT_REF_CELL.with(|boa_context_ref_cell| {
                    let mut boa_context = boa_context_ref_cell.borrow_mut();

                    let uuid = uuid::Uuid::new_v4().to_string();

                    crate::UUID_REF_CELL.with(|uuid_ref_cell| {
                        let mut uuid_mut = uuid_ref_cell.borrow_mut();

                        *uuid_mut = uuid.clone();
                    });

                    crate::METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                        let mut method_name_mut = method_name_ref_cell.borrow_mut();

                        *method_name_mut = "_AZLE_TIMER".to_string();
                    });

                    crate::MANUAL_REF_CELL.with(|manual_ref_cell| {
                        let mut manual_mut = manual_ref_cell.borrow_mut();

                        *manual_mut = false;
                    });

                    let boa_return_value = func_js_object
                        .call(&boa_engine::JsValue::Null, &[], &mut *boa_context)
                        .unwrap_or_trap(&mut *boa_context);

                    crate::_azle_async_await_result_handler::async_await_result_handler(
                        &mut boa_context,
                        &boa_return_value,
                        &uuid,
                        "_AZLE_TIMER",
                        false,
                    )
                    .unwrap_or_trap(&mut *boa_context);
                });
            };

            let timer_id = ic_cdk_timers::set_timer_interval(interval, closure);

            timer_id
                .try_into_vm_value(context)
                .map_err(|vmc_err| vmc_err.to_js_error(None))
        }
    }
}
