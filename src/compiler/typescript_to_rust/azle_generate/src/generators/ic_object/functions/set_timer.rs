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

            let uid = _azle_create_uid();

            // We cannot pass the func_js_object directly to the closure because it's lifetime isn't
            // long enough. It will go out of scope before it can be used by the closure. So
            // instead, we store it in a global variable using a string key, and then use the string
            // key (which can be passed to the closure) to look up the func_js_object, and then we
            // can call it.
            TIMER_CALLBACKS_REF_CELL.with(|timer_callbacks_ref_cell| {
                let mut timer_callbacks = timer_callbacks_ref_cell.borrow_mut();

                timer_callbacks.insert(uid.clone(), func_js_object)
            });

            let closure = move || {
                unsafe {
                    let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                    TIMER_CALLBACKS_REF_CELL.with(|timer_callbacks_ref_cell| {
                        let mut timer_callbacks = timer_callbacks_ref_cell.borrow_mut();

                        let callback = timer_callbacks.get(&uid).unwrap();

                        _azle_handle_boa_result(
                            callback.call(
                                &boa_engine::JsValue::Null,
                                &[],
                                &mut *_azle_boa_context
                            ),
                            &mut *_azle_boa_context
                        );

                        timer_callbacks.remove(&uid)
                    });
                }
            };

            Ok(ic_cdk::timer::set_timer(delay, closure).try_into_vm_value(_context).unwrap())
        }

        fn _azle_create_uid() -> String {
            RNG_REF_CELL.with(|rng_ref_cell| {
                let mut rng = rng_ref_cell.borrow_mut();
                let random_values: [u8; 32] = rng.gen();
                let mut hasher = Sha224::new();
                hasher.update(random_values);
                let hash = hasher.finalize();
                base32::encode(Alphabet::RFC4648 { padding: false }, &hash)
            })
        }
    }
}
