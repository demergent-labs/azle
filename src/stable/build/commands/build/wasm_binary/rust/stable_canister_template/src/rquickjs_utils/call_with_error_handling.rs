use std::error::Error;

use rquickjs::{Ctx, Function, Promise, Value, function::IntoArgs};

use crate::rquickjs_utils::{handle_promise_error, trap_on_last_exception};

pub fn call_with_error_handling<'a>(
    ctx: &Ctx<'a>,
    function: &Function<'a>,
    args: impl IntoArgs<'a>,
) -> Result<Value<'a>, Box<dyn Error>> {
    let result: Value = match function.call(args) {
        Ok(value) => value,
        Err(_) => trap_on_last_exception(ctx)?,
    };

    if result.is_promise() {
        let promise: Promise = result
            .clone()
            .into_promise()
            .ok_or("Failed to convert function call return JS value to promise")?;
        handle_promise_error(ctx, &promise)?;
    }

    Ok(result)
}
