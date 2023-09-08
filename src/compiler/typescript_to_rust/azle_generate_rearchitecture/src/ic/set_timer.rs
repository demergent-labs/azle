use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn set_timer<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let candid_encoded_array_buffer: Vec<u8> = args
                .get(0)
                .expect("performanceCounter must have one argument")
                .to_js_value()?
                .try_into()?;

            let delay_as_u64: u64 = candid::decode_one(&candid_encoded_array_buffer)?;

            let delay = core::time::Duration::new(delay_as_u64, 0);

            // TODO: Get the callback they passed in somehow

            let callback: JSValue = args
                .get(1)
                .expect("An argument for 'callback' was not provided")
                .to_js_value()?;

            let closure = move || {
                ic_cdk::println!("The timer was called!!!");

                CONTEXT.with(|context| {
                    let mut context = context.borrow_mut();
                    let context = context.as_mut().unwrap();

                    let callback_js_value_ref = to_qjs_value(&context, &callback).unwrap();

                    if callback_js_value_ref.is_function() {
                        ic_cdk::println!("and the callback seems to be a function...");
                    } else {
                        ic_cdk::println!("BUT THE CALLBACK ISN'T A FUNCTION!!!");
                        if callback_js_value_ref.is_object() {
                            ic_cdk::println!("Callback is an object");
                        }
                    }

                    // TODO I am not sure what the first parameter to call is supposed to be
                    callback_js_value_ref.call(&callback_js_value_ref, &[]).unwrap();
                });
            };

            let timer_id: ic_cdk_timers::TimerId = ic_cdk_timers::set_timer(delay, closure);
            let timer_id_as_u64: u64 = timer_id.data().as_ffi();
            let timer_id_candid_encoded_bytes: JSValue =
                candid::encode_one(timer_id_as_u64)?.into();
            to_qjs_value(&context, &timer_id_candid_encoded_bytes)
        }
    }
}
