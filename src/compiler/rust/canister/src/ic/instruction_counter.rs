use quickjs_wasm_rs::{to_qjs_value, CallbackArg, JSContextRef, JSValue, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    _args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let instruction_counter_js_value: JSValue =
        ic_cdk::api::instruction_counter().to_string().into();
    to_qjs_value(&context, &instruction_counter_js_value)
}
