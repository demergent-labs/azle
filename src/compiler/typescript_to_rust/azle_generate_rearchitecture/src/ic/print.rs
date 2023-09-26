use quickjs_wasm_rs::{CallbackArg, JSContextRef, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    for arg in args {
        let value = arg.to_js_value()?;
        ic_cdk::println!("{:?} ", value);
    }
    context.undefined_value()
}
