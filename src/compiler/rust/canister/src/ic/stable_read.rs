use std::convert::TryInto;

use quickjs_wasm_rs::{to_qjs_value, CallbackArg, JSContextRef, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let offset_string: String = args
        .get(0)
        .expect("stableRead must have two arguments")
        .to_js_value()?
        .try_into()?;

    let length_string: String = args
        .get(1)
        .expect("stableRead must have two arguments")
        .to_js_value()?
        .try_into()?;

    let mut buf: Vec<u8> = vec![0; length_string.parse()?];
    ic_cdk::api::stable::stable_read(offset_string.parse()?, &mut buf);

    to_qjs_value(&context, &buf.into())
}
