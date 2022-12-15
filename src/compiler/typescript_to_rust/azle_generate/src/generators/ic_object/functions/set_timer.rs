pub fn generate_ic_object_function_set_timer() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_set_timer(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let delay_js_value = _aargs.get(0).unwrap().clone();
            let delay_as_u64: u64 = delay_js_value.try_from_vm_value(&mut *_context).unwrap();
            let delay = core::time::Duration::new(delay_as_u64, 0);

            let func_js_value = _aargs.get(1).unwrap();
            let func_js_object = func_js_value.as_object().unwrap().clone();

            let callback_id = _azle_create_uid();
            let callback_id_clone_for_closure = callback_id.clone();

            // We cannot pass the func_js_object directly to the closure because it's lifetime isn't
            // long enough. It will go out of scope before it can be used by the closure. So
            // instead, we store it in a global variable using a string key, and then use the string
            // key (which can be passed to the closure) to look up the func_js_object, and then we
            // can call it.
            TIMER_CALLBACKS_REF_CELL.with(|timer_callbacks_ref_cell| {
                let mut timer_callbacks = timer_callbacks_ref_cell.borrow_mut();

                timer_callbacks.insert(callback_id.clone(), TimerCallback {
                    callback: func_js_object,
                    timer_id: 0 // This is just a placeholder until we create the timer below.
                })
            });

            let closure = move || {
                unsafe {
                    ic_cdk::println!("Callback {} called", &callback_id_clone_for_closure);

                    let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                    TIMER_CALLBACKS_REF_CELL.with(|timer_callbacks_ref_cell| {
                        let mut timer_callbacks = timer_callbacks_ref_cell.borrow_mut();

                        let timer_callback = timer_callbacks.get(&callback_id_clone_for_closure).unwrap();

                        _azle_handle_boa_result(
                            timer_callback.callback.call(
                                &boa_engine::JsValue::Null,
                                &[],
                                &mut *_azle_boa_context
                            ),
                            &mut *_azle_boa_context
                        );

                        // timer_callbacks.remove(&callback_id_clone_for_closure);

                        TIMER_CALLBACK_LOOKUP_REF_CELL.with(|timer_callback_lookup_ref_cell| {
                            timer_callback_lookup_ref_cell.borrow_mut().remove(&timer_callback.timer_id);
                        });
                        ic_cdk::println!("Timer {} removed from HashMap", &timer_callback.timer_id);
                    });
                }
            };

            let timer_id = ic_cdk::timer::set_timer(delay, closure);

            let timer_id_as_u64 = timer_id.data().as_ffi();

            TIMER_CALLBACKS_REF_CELL.with(|timer_callbacks_ref_cell|{
                let mut timer_callbacks = timer_callbacks_ref_cell.borrow_mut();

                timer_callbacks
                    .entry(callback_id.clone())
                    .and_modify(|timer_callback| timer_callback.timer_id = timer_id_as_u64);
            });

            TIMER_CALLBACK_LOOKUP_REF_CELL.with(|timer_callback_lookup_ref_cell|{
                let mut timer_callback_lookup = timer_callback_lookup_ref_cell.borrow_mut();

                timer_callback_lookup.insert(timer_id_as_u64, callback_id.clone());
            });

            ic_cdk::println!("Registered timer {} with callback: {}", &timer_id_as_u64, &callback_id);

            Ok(timer_id.try_into_vm_value(_context).unwrap())
        }
    }
}
