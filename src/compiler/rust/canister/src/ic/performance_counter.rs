use std::convert::TryInto;

use quickjs_wasm_rs::{to_qjs_value, CallbackArg, JSContextRef, JSValue, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let counter_type_vec_u8: Vec<u8> = args
        .get(0)
        .expect("performanceCounter must have one argument")
        .to_js_value()?
        .try_into()?;

    let counter_type: u32 = candid::decode_one(&counter_type_vec_u8)?;

    let return_js_value: JSValue =
        candid::encode_one(ic_cdk::api::call::performance_counter(counter_type))?.into();
    to_qjs_value(&context, &return_js_value)
}
