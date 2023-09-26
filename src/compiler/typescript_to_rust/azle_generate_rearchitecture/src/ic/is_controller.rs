use std::convert::TryInto;

use quickjs_wasm_rs::{to_qjs_value, CallbackArg, JSContextRef, JSValue, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let principal_bytes: Vec<u8> = args
        .get(0)
        .expect("isController must have at least one argument")
        .to_js_value()?
        .try_into()?;

    let principal = candid::Principal::from_slice(&principal_bytes);

    let is_controller_js_value: JSValue = ic_cdk::api::is_controller(&principal).into();
    to_qjs_value(&context, &is_controller_js_value)
}
