use std::convert::TryInto;

use quickjs_wasm_rs::{CallbackArg, JSContextRef, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let string_to_print: String = args
        .get(0)
        .expect("console.log must have at least one argument")
        .to_js_value()?
        .try_into()?;

    ic_cdk::print(string_to_print);

    context.undefined_value()
}
