use std::error::Error;

use rquickjs::{Ctx, Function, Promise, Value, function::IntoArgs};

use crate::rquickjs_utils::{drain_microtasks, handle_promise_error, trap_on_last_exception};

pub fn call_with_error_handling<'a>(
    ctx: &Ctx<'a>,
    function: &Function<'a>,
    args: impl IntoArgs<'a>,
) -> Result<Value<'a>, Box<dyn Error>> {
    // JavaScript macrotask
    let result: Value = match function.call(args) {
        Ok(value) => value,
        Err(_) => trap_on_last_exception(ctx)?,
    };

    // We should handle the promise error before drain_microtasks
    // as all JavaScript microtasks queued from the macrotask execution
    // will be discarded if there is a trap
    if result.is_promise() {
        let promise: Promise = result
            .clone()
            .into_promise()
            .ok_or("Failed to convert function call return JS value to promise")?;
        handle_promise_error(ctx, &promise)?;
    }

    // We consider the function.call above to be a JavaScript macrotask,
    // thus we drain all JavaScript microtasks queued during its execution
    drain_microtasks(ctx);

    Ok(result)
}
