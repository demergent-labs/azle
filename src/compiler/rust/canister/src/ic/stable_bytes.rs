use quickjs_wasm_rs::{to_qjs_value, CallbackArg, JSContextRef, JSValue, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    _args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let stable_bytes_js_value: JSValue = ic_cdk::api::stable::stable_bytes().into();
    to_qjs_value(&context, &stable_bytes_js_value)
}
