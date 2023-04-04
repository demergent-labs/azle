pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn set_timer_interval(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let interval_js_value = _aargs.get(0).unwrap().clone();
            let interval_as_u64: u64 = interval_js_value.try_from_vm_value(&mut *_context).unwrap();
            let interval = core::time::Duration::new(interval_as_u64, 0);

            let func_js_value = _aargs.get(1).unwrap();
            let func_js_object = func_js_value.as_object().unwrap().clone();

            let closure = move || {
                crate::ref_cells::BOA_CONTEXT.with(|boa_context_ref_cell| {
                    let mut _azle_boa_context = boa_context_ref_cell.borrow_mut();

                    let uuid = uuid::Uuid::new_v4().to_string();

                    crate::ref_cells::set_uuid(&uuid);
                    crate::ref_cells::set_method_name(&"_AZLE_TIMER".to_string());
                    crate::ref_cells::set_is_manual(false);

                    let _azle_boa_return_value = func_js_object.call(
                        &boa_engine::JsValue::Null,
                        &[],
                        &mut *_azle_boa_context
                    ).or_trap(&mut *_azle_boa_context);

                    crate::_azle_async_await_result_handler(
                        &mut _azle_boa_context,
                        &_azle_boa_return_value,
                        &uuid,
                        "_AZLE_TIMER",
                        false
                    );
                });
            };

            let timer_id = ic_cdk_timers::set_timer_interval(interval, closure);

            Ok(timer_id.try_into_vm_value(_context).unwrap())
        }
    }
}
