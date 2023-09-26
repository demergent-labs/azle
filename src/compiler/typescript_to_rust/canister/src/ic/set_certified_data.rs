use std::convert::TryInto;

use quickjs_wasm_rs::{CallbackArg, JSContextRef, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let certified_data_bytes: Vec<u8> = args
        .get(0)
        .expect("setCertifiedData must have one argument")
        .to_js_value()?
        .try_into()?;

    let certified_data: Vec<u8> = candid::decode_one(&certified_data_bytes)?;

    ic_cdk::api::set_certified_data(&certified_data);
    context.undefined_value()
}
