use std::convert::TryInto;

use quickjs_wasm_rs::{to_qjs_value, CallbackArg, JSContextRef, JSValue, JSValueRef};
use slotmap::Key;

use crate::CONTEXT;

pub fn native_function<'a>(
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

    let callback_id: String = args
        .get(1)
        .expect("An argument for 'callback' was not provided")
        .to_js_value()?
        .try_into()?;

    let closure = move || {
        CONTEXT.with(|context| {
            let mut context = context.borrow_mut();
            let context = context.as_mut().unwrap();

            let global = context.global_object().unwrap();

            let timer_callback = global
                .get_property("_azleTimerCallbacks")
                .unwrap()
                .get_property(callback_id.as_str())
                .unwrap_or_else(|e| ic_cdk::api::trap(e.to_string().as_str()));

            // TODO I am not sure what the first parameter to call is supposed to be
            let callback_result = timer_callback.call(&timer_callback, &[]);

            if let Err(e) = callback_result {
                ic_cdk::api::trap(e.to_string().as_str())
            }
        });
    };

    let timer_id: ic_cdk_timers::TimerId = ic_cdk_timers::set_timer(delay, closure);
    let timer_id_as_u64: u64 = timer_id.data().as_ffi();
    let timer_id_candid_encoded_bytes: JSValue = candid::encode_one(timer_id_as_u64)
        .unwrap_or_else(|e| {
            // If something goes wrong we need to clear the timer before
            // throwing to the JS above.
            ic_cdk_timers::clear_timer(timer_id);
            ic_cdk::api::trap(e.to_string().as_str());
        })
        .into();

    to_qjs_value(&context, &timer_id_candid_encoded_bytes)
}
