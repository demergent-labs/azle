use std::convert::TryInto;

use quickjs_wasm_rs::{CallbackArg, JSContextRef, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let offset_string: String = args
        .get(0)
        .expect("stable64Write must have two arguments")
        .to_js_value()?
        .try_into()?;

    let buf: Vec<u8> = args
        .get(1)
        .expect("stable64Write must have two arguments")
        .to_js_value()?
        .try_into()?;

    ic_cdk::api::stable::stable64_write(offset_string.parse()?, &buf);

    context.undefined_value()
}
