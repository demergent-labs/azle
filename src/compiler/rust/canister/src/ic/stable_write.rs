use std::convert::TryInto;

use quickjs_wasm_rs::{CallbackArg, JSContextRef, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let params_bytes: Vec<u8> = args
        .get(0)
        .expect("stableWrite must have two arguments")
        .to_js_value()?
        .try_into()?;

    let (offset, buf): (u32, Vec<u8>) = candid::decode_args(&params_bytes)?;

    ic_cdk::api::stable::stable_write(offset, &buf);

    context.undefined_value()
}
