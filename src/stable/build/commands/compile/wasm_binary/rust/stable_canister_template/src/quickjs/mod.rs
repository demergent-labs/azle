use std::error::Error;

use rquickjs::{Ctx, Function, Promise, Value, function::IntoArgs};

use crate::{
    CONTEXT_REF_CELL,
    error::{handle_promise_error, trap_on_last_exception},
};

// TODO rename to rquickjs_with_ctx
pub fn with_ctx<F, R>(callback: F) -> Result<R, Box<dyn Error>>
where
    F: FnOnce(Ctx<'static>) -> Result<R, Box<dyn Error>>,
{
    CONTEXT_REF_CELL.with(|context_ref_cell| {
        let context_ref = context_ref_cell.borrow();
        let context = context_ref
            .as_ref()
            .ok_or("QuickJS context not initialized")?;

        context.with(|ctx| {
            let ctx = unsafe { std::mem::transmute::<Ctx<'_>, Ctx<'static>>(ctx) };

            let result = callback(ctx.clone())
                .map_err(|e| format!("QuickJS callback execution failed: {e}"))?;

            Ok(result)
        })
    })
}

// TODO I feel like we should move this to its own file and rename it to rquickjs_run_event_loop
// TODO improve this comment
// Drain all micro tasks currently queued
// Essentially this will drive all queue
// Promise.then, Promise.catch, and async/await after await-points to completion
pub fn run_event_loop(ctx: &Ctx) {
    while ctx.execute_pending_job() {}
}

// TODO it seems like this function should have its own file
// TODO also, I'm wondering if it's actually in here
// TODO that we should be calling run_event_loop
// TODO it seems like we might be able to treat each function.call
// TODO as a macro task. This macro task will queue up promises (micro tasks)
// TODO and then once it is fully complete, we should drain the micro task queue
pub fn call_with_error_handling<'a>(
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
