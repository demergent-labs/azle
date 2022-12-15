pub fn generate_timers_module() -> proc_macro2::TokenStream {
    quote::quote! {
        pub mod timers {
            pub struct TimerCallback {
                pub function: boa_engine::object::JsObject,
                pub timer_id: ic_cdk::timer::TimerId,
            }

            thread_local! {
                static TIMER_CALLBACKS_REF_CELL: std::cell::RefCell<std::collections::HashMap<String, TimerCallback>>
                    = std::cell::RefCell::new(std::collections::HashMap::new());
                static TIMER_CALLBACK_LOOKUP_REF_CELL: std::cell::RefCell<std::collections::HashMap<ic_cdk::timer::TimerId, String>>
                    = std::cell::RefCell::new(std::collections::HashMap::new());
            }

            pub fn delete_timer_callback(timer_id: &ic_cdk::timer::TimerId) {
                TIMER_CALLBACK_LOOKUP_REF_CELL.with(|timer_callback_lookup_ref_cell| {
                    let mut timer_callback_lookup = timer_callback_lookup_ref_cell.borrow_mut();

                    let timer_callback_id = timer_callback_lookup.get(&timer_id).unwrap().clone();

                    TIMER_CALLBACKS_REF_CELL.with(|timer_callbacks_ref_cell| {
                        timer_callbacks_ref_cell.borrow_mut().remove(&timer_callback_id);
                    });

                    timer_callback_lookup.remove(&timer_id);
                });
            }

            pub fn set_timer(delay: core::time::Duration, func_js_object: boa_engine::object::JsObject) -> ic_cdk::timer::TimerId {

                let callback_id = uuid::Uuid::new_v4().to_string();

                // We cannot pass the func_js_object directly to the closure because it's lifetime isn't
                // long enough. It will go out of scope before it can be used by the closure. So
                // instead, we store it in a global variable using a string key, and then use the string
                // key (which can be passed to the closure) to look up the func_js_object, and then we
                // can call it.
                TIMER_CALLBACKS_REF_CELL.with(|timer_callbacks_ref_cell| {
                    let mut timer_callbacks = timer_callbacks_ref_cell.borrow_mut();

                    timer_callbacks.insert(callback_id.clone(), TimerCallback {
                        function: func_js_object,
                        timer_id: ic_cdk::timer::TimerId::default() // This is just a placeholder until we create the timer below.
                    })
                });

                let closure = create_callback_closure(callback_id.clone());

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

                timer_id
            }

            pub fn set_timer_interval(interval: core::time::Duration, func_js_object: boa_engine::object::JsObject) -> ic_cdk::timer::TimerId {
                let callback_id = uuid::Uuid::new_v4().to_string();

                // We cannot pass the func_js_object directly to the closure because it's lifetime isn't
                // long enough. It will go out of scope before it can be used by the closure. So
                // instead, we store it in a global variable using a string key, and then use the string
                // key (which can be passed to the closure) to look up the func_js_object, and then we
                // can call it.
                TIMER_CALLBACKS_REF_CELL.with(|timer_callbacks_ref_cell| {
                    let mut timer_callbacks = timer_callbacks_ref_cell.borrow_mut();

                    timer_callbacks.insert(callback_id.clone(), TimerCallback {
                        function: func_js_object,
                        timer_id: ic_cdk::timer::TimerId::default() // This is just a placeholder until we create the timer below.
                    })
                });

                let closure = create_interval_callback_closure(callback_id.clone());

                let timer_id = ic_cdk::timer::set_timer_interval(interval, closure);

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

                timer_id
            }

            fn create_callback_closure(callback_id: String) -> impl FnOnce() + 'static {
                move || {
                    unsafe {
                        let mut _azle_boa_context = crate::BOA_CONTEXT_OPTION.as_mut().unwrap();

                        let timer_id = TIMER_CALLBACKS_REF_CELL.with(|timer_callbacks_ref_cell| {
                            let timer_callbacks = timer_callbacks_ref_cell.borrow();

                            let timer_callback = timer_callbacks.get(&callback_id).unwrap();

                            crate::_azle_handle_boa_result(
                                timer_callback.function.call(
                                    &boa_engine::JsValue::Null,
                                    &[],
                                    &mut *_azle_boa_context
                                ),
                                &mut *_azle_boa_context
                            );

                            timer_callback.timer_id
                        });

                        delete_timer_callback(&timer_id);
                    }
                }
            }

            fn create_interval_callback_closure(callback_id: String) -> impl FnMut() + 'static {
                move || {
                    unsafe {
                        let mut _azle_boa_context = crate::BOA_CONTEXT_OPTION.as_mut().unwrap();

                        let timer_id = TIMER_CALLBACKS_REF_CELL.with(|timer_callbacks_ref_cell| {
                            let timer_callbacks = timer_callbacks_ref_cell.borrow();

                            let timer_callback = timer_callbacks.get(&callback_id).unwrap();

                            crate::_azle_handle_boa_result(
                                timer_callback.function.call(
                                    &boa_engine::JsValue::Null,
                                    &[],
                                    &mut *_azle_boa_context
                                ),
                                &mut *_azle_boa_context
                            );

                            timer_callback.timer_id
                        });
                    }
                }
            }
        }
    }
}
