pub fn generate_ic_object_function_clear_timer() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_clear_timer(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let timer_id_js_value: boa_engine::JsValue = _aargs.get(0).unwrap().clone();
            let timer_id: ic_cdk::timer::TimerId = timer_id_js_value.try_from_vm_value(&mut *_context).unwrap();
            let timer_id_as_u64 = timer_id.data().as_ffi();

            ic_cdk::timer::clear_timer(timer_id);

            TIMER_CALLBACK_LOOKUP_REF_CELL.with(|timer_callback_lookup_ref_cell| {
                let mut timer_callback_lookup = timer_callback_lookup_ref_cell.borrow_mut();

                let timer_callback_id = &timer_callback_lookup.get(&timer_id_as_u64).unwrap();

                TIMER_CALLBACKS_REF_CELL.with(|timer_callbacks_ref_cell| {
                    let mut timer_callbacks = timer_callbacks_ref_cell.borrow_mut();
                    timer_callbacks.remove(timer_callback_id.clone());
                    ic_cdk::println!("Cleared TimerCallback: {}", timer_callback_id);
                });

                timer_callback_lookup.remove(&timer_id_as_u64);
                ic_cdk::println!("Cleared TimerCallback Lookup: {}", &timer_id_as_u64);
            });

            Ok(boa_engine::JsValue::Undefined)
        }
    }
}
