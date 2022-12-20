pub fn generate_ic_object_function_set_timer_interval() -> proc_macro2::TokenStream {
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

            let closure = move || {
                BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
                    let mut _azle_boa_context = box_context_ref_cell.borrow_mut();

                    _azle_handle_boa_result(
                        func_js_object.call(
                            &boa_engine::JsValue::Null,
                            &[],
                            &mut *_azle_boa_context
                        ),
                        &mut *_azle_boa_context
                    );
                });
            };

            let timer_id = ic_cdk::timer::set_timer_interval(interval, closure);

            Ok(timer_id.try_into_vm_value(_context).unwrap())
        }
    }
}
