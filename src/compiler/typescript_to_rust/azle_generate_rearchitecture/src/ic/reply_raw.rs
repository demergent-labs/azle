use std::convert::TryInto;

use quickjs_wasm_rs::{CallbackArg, JSContextRef, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let buf: Vec<u8> = args
        .get(0)
        .expect("replyRaw must have one argument")
        .to_js_value()?
        .try_into()?;

    ic_cdk::api::call::reply_raw(&buf);
    context.undefined_value()
}
