use std::convert::TryInto;

use quickjs_wasm_rs::{CallbackArg, JSContextRef, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let first_arg_option = args.get(0);

    if let Some(first_arg) = first_arg_option {
        let string_to_print: String = first_arg.to_js_value()?.try_into()?;
        ic_cdk::print(string_to_print);
    } else {
        ic_cdk::print("");
    }

    context.undefined_value()
}
