use quickjs_wasm_rs::{to_qjs_value, CallbackArg, JSContextRef, JSValue, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    _args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let arg_data_raw_size_js_value: JSValue = ic_cdk::api::call::arg_data_raw_size().into();
    to_qjs_value(&context, &arg_data_raw_size_js_value)
}
