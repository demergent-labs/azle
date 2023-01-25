pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_set_timer_interval(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let interval_js_value = _aargs.get(0).unwrap().clone();
            let interval_as_u64: u64 = interval_js_value.try_from_vm_value(&mut *_context).unwrap();
            let interval = core::time::Duration::new(interval_as_u64, 0);

            let func_js_value = _aargs.get(1).unwrap();
            let func_js_object = func_js_value.as_object().unwrap().clone();

            let uuid = UUID_REF_CELL.with(|uuid_ref_cell| uuid_ref_cell.borrow().clone());
            let method_name = METHOD_NAME_REF_CELL.with(|method_name_ref_cell| method_name_ref_cell.borrow().clone());

            // TODO we can have multiple timers per call...so will this uuid work?
            // TODO the uuid is very scary...can we somehow get rid of it?
            // TODO think deeply about this
            // TODO got this error: Panicked at 'called `Option::unwrap()` on a `None` value', src/src/lib.rs:6663:59
            let closure = move || {
                // TODO I think we simply need to make a UUID in here?
                // TODO each timer should have its own uuid
                // TODO shouldn't each cross canister call promise get its own uuid? Why am I setting it at the beginning of the call?

                BOA_CONTEXT_REF_CELL.with(|boa_context_ref_cell| {
                    let mut _azle_boa_context = boa_context_ref_cell.borrow_mut();

                    let _azle_boa_return_value = _azle_handle_boa_result(
                        func_js_object.call(
                            &boa_engine::JsValue::Null,
                            &[],
                            &mut *_azle_boa_context
                        ),
                        &mut *_azle_boa_context
                    );

                    _azle_async_await_result_handler(
                        &mut _azle_boa_context,
                        &_azle_boa_return_value,
                        &uuid,
                        &method_name,
                        true
                    );
                });
            };

            let timer_id = ic_cdk::timer::set_timer_interval(interval, closure);

            Ok(timer_id.try_into_vm_value(_context).unwrap())
        }
    }
}
