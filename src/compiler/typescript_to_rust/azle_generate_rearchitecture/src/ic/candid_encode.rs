use std::convert::TryInto;

use quickjs_wasm_rs::{to_qjs_value, CallbackArg, JSContextRef, JSValue, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    _args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let candid_string: String = _args
        .get(0)
        .expect("candidEncode must have at least one argument")
        .to_js_value()?
        .try_into()?;

    let candid_args: candid::IDLArgs = candid_string.parse()?;
    let candid_encoded: Vec<u8> = candid_args.to_bytes()?;

    let candid_encoded_js_value: JSValue = candid_encoded.into();
    to_qjs_value(&context, &candid_encoded_js_value)
}
