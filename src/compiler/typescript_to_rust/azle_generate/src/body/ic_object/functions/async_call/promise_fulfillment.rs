pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
            let mut boa_context = box_context_ref_cell.borrow_mut();

            let call_result_js_value = match call_result {
                Ok(value) => {
                    let js_value = value.try_into_vm_value(&mut *boa_context).unwrap();

                    let canister_result_js_object = boa_engine::object::ObjectInitializer::new(&mut *boa_context)
                        .property(
                            "Ok",
                            js_value,
                            boa_engine::property::Attribute::all()
                        )
                        .build();

                    let canister_result_js_value = canister_result_js_object.into();

                    canister_result_js_value
                },
                Err(err) => {
                    let js_value = format!("Rejection code {rejection_code}, {error_message}", rejection_code = (err.0 as i32).to_string(), error_message = err.1).try_into_vm_value(&mut *boa_context).unwrap();

                    let canister_result_js_object = boa_engine::object::ObjectInitializer::new(&mut *boa_context)
                        .property(
                            "Err",
                            js_value,
                            boa_engine::property::Attribute::all()
                        )
                        .build();

                    let canister_result_js_value = canister_result_js_object.into();

                    canister_result_js_value
                }
            };

            js_promise_resolvers.resolve.call(&boa_engine::JsValue::undefined(), &[call_result_js_value], &mut *boa_context).unwrap();

            let main_promise = PROMISE_MAP_REF_CELL.with(|promise_map_ref_cell| {
                let promise_map = promise_map_ref_cell.borrow().clone();

                let main_promise = promise_map.get(&uuid).unwrap();

                main_promise.clone()
            });

            async_await_result_handler(&mut *boa_context, &main_promise, &uuid, &method_name, manual);
        });
    }
}
