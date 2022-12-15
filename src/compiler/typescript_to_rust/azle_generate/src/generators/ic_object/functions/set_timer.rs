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
            let closure_owned_callback_id = callback_id.clone();

            // We cannot pass the func_js_object directly to the closure because it's lifetime isn't
            // long enough. It will go out of scope before it can be used by the closure. So
            // instead, we store it in a global variable using a string key, and then use the string
            // key (which can be passed to the closure) to look up the func_js_object, and then we
            // can call it.
            TIMER_CALLBACKS_REF_CELL.with(|timer_callbacks_ref_cell| {
                let mut timer_callbacks = timer_callbacks_ref_cell.borrow_mut();

                timer_callbacks.insert(callback_id.clone(), timers::TimerCallback {
                    function: func_js_object,
                    timer_id: ic_cdk::timer::TimerId::default() // This is just a placeholder until we create the timer below.
                })
            });

            let closure = move || {
                unsafe {
                    ic_cdk::println!("Callback {} called", &closure_owned_callback_id);

                    let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                    let timer_id = TIMER_CALLBACKS_REF_CELL.with(|timer_callbacks_ref_cell| {
                        let timer_callbacks = timer_callbacks_ref_cell.borrow();

                        let timer_callback = timer_callbacks.get(&closure_owned_callback_id).unwrap();

                        _azle_handle_boa_result(
                            timer_callback.function.call(
                                &boa_engine::JsValue::Null,
                                &[],
                                &mut *_azle_boa_context
                            ),
                            &mut *_azle_boa_context
                        );

                        timer_callback.timer_id
                    });

                    timers::delete_timer_callback(&timer_id);
                }
            };

            let timer_id = ic_cdk::timer::set_timer(delay, closure);

            TIMER_CALLBACKS_REF_CELL.with(|timer_callbacks_ref_cell|{
                let mut timer_callbacks = timer_callbacks_ref_cell.borrow_mut();

                timer_callbacks
                    .entry(callback_id.clone())
                    .and_modify(|timer_callback| timer_callback.timer_id = timer_id);
            });

            TIMER_CALLBACK_LOOKUP_REF_CELL.with(|timer_callback_lookup_ref_cell|{
                let mut timer_callback_lookup = timer_callback_lookup_ref_cell.borrow_mut();

                timer_callback_lookup.insert(timer_id, callback_id.clone());
            });

            ic_cdk::println!("Registered timer {:?} with callback: {}", &timer_id, &callback_id);

            Ok(timer_id.try_into_vm_value(_context).unwrap())
        }
    }
}
