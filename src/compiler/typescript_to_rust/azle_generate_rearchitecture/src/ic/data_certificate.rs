use quickjs_wasm_rs::{to_qjs_value, CallbackArg, JSContextRef, JSValue, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    _args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    match ic_cdk::api::data_certificate() {
        Some(data_certificate_vec_u8) => {
            let data_certificate_js_value: JSValue = data_certificate_vec_u8.into();
            to_qjs_value(&context, &data_certificate_js_value)
        }
        None => context.undefined_value(),
    }
}
