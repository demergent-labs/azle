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

            // let callback: u64 args
            //     .get(1)
            //     .expect("An argument for 'callback' was not provided")
            //     .to_js_value()?
            //     .try_into()?;

            let closure = move || {
                // TODO: Hook this up to the callback they passed
                ic_cdk::println!("The timer was called!!!");
            };

            let timer_id: ic_cdk_timers::TimerId = ic_cdk_timers::set_timer(delay, closure);
            let timer_id_as_u64: u64 = timer_id.data().as_ffi();
            let timer_id_candid_encoded_bytes: JSValue =
                candid::encode_one(timer_id_as_u64)?.into();
            to_qjs_value(&context, &timer_id_candid_encoded_bytes)
        }
    }
}
