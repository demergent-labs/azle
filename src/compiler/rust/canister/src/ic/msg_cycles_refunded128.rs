use quickjs_wasm_rs::{to_qjs_value, CallbackArg, JSContextRef, JSValue, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    _args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let return_js_value: JSValue =
        candid::encode_one(ic_cdk::api::call::msg_cycles_refunded128())?.into();
    to_qjs_value(&context, &return_js_value)
}
