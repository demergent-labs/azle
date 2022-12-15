pub fn generate_timers_module() -> proc_macro2::TokenStream {
    quote::quote! {
        pub mod timers {
            use std::{cell::RefCell, collections::HashMap};
            use ic_cdk::timer::TimerId;
            use boa_engine::object::JsObject;
            use core::time::Duration;

            pub struct TimerCallback {
                pub function: JsObject,
                pub timer_id: TimerId,
            }

            thread_local! {
                static TIMER_CALLBACKS_REF_CELL: RefCell<HashMap<String, TimerCallback>>
                    = RefCell::new(HashMap::new());
                static TIMER_CALLBACK_LOOKUP_REF_CELL: RefCell<HashMap<TimerId, String>>
                    = RefCell::new(HashMap::new());
            }

            pub fn delete_timer_callback(timer_id: &TimerId) {
                TIMER_CALLBACK_LOOKUP_REF_CELL.with(|timer_callback_lookup_ref_cell| {
                    let mut timer_callback_lookup = timer_callback_lookup_ref_cell.borrow_mut();

                    let timer_callback_id = timer_callback_lookup.get(&timer_id).unwrap().clone();

                    TIMER_CALLBACKS_REF_CELL.with(|timer_callbacks_ref_cell| {
                        timer_callbacks_ref_cell.borrow_mut().remove(&timer_callback_id);
                    });

                    timer_callback_lookup.remove(&timer_id);
                });
            }

            pub fn set_timer(
                duration: Duration,
                function: JsObject,
                repeat: bool
            ) -> TimerId {
                let callback_id = uuid::Uuid::new_v4().to_string();

                // We cannot pass the function directly to the closure because it's lifetime isn't
                // long enough. It will go out of scope before it can be used by the closure. So
                // instead, we store it in a global variable using a string key, and then later
                // use that key (which can be passed to the closure) to look up the function.
                TIMER_CALLBACKS_REF_CELL.with(|timer_callbacks_ref_cell| {
                    let mut timer_callbacks = timer_callbacks_ref_cell.borrow_mut();

                    timer_callbacks.insert(callback_id.clone(), TimerCallback {
                        function,
                        timer_id: TimerId::default() // This is just a placeholder until we create the timer below.
                    })
                });

                let closure = create_callback_closure(callback_id.clone(), !repeat);

                let timer_id = if repeat {
                    ic_cdk::timer::set_timer_interval(duration, closure)
                } else {
                    ic_cdk::timer::set_timer(duration, closure)
                };

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

            fn create_callback_closure(callback_id: String, should_auto_delete: bool) -> impl FnMut() + 'static {
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

                        if should_auto_delete {
                            delete_timer_callback(&timer_id);
                        }
                    }
                }
            }
        }
    }
}
