use std::error::Error;

use rquickjs::{Ctx, Function, Promise, Value, function::IntoArgs};

use crate::{
    error::{handle_promise_error, trap_on_last_exception},
    quickjs_with_ctx::run_event_loop,
};

// TODO it seems like this function should have its own file
// TODO also, I'm wondering if it's actually in here
// TODO that we should be calling run_event_loop
// TODO it seems like we might be able to treat each function.call
// TODO as a macro task. This macro task will queue up promises (micro tasks)
// TODO and then once it is fully complete, we should drain the micro task queue
pub fn quickjs_call_with_error_handling<'a>(
    ctx: &Ctx<'a>,
    function: &Function<'a>,
    args: impl IntoArgs<'a>,
) -> Result<Value<'a>, Box<dyn Error>> {
    // JavaScript macro task
    let result: Value = match function.call(args) {
        Ok(value) => value,
        Err(_) => trap_on_last_exception(ctx.clone())?,
    };

    // We should handle the promise error before run_event_loop
    // as all JavaScript micro tasks queued from the macro task execution
    // will be discarded if there is a trap
    if result.is_promise() {
        let promise: Promise = result
            .clone()
            .into_promise()
            .ok_or("Failed to convert function call return JS value to promise")?;
        handle_promise_error(ctx.clone(), promise)?;
    }

    // We consider the function.call above to be a JavaScript macro task,
    // thus we drain all JavaScript micro tasks queued during its execution
    run_event_loop(ctx);

    Ok(result)
}
