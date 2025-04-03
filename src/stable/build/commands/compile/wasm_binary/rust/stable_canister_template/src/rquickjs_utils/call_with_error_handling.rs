use std::error::Error;

use rquickjs::{Ctx, Function, Promise, Value, function::IntoArgs};

use crate::rquickjs_utils::{drain_microtasks, handle_promise_error, trap_on_last_exception};

pub fn call_with_error_handling<'a>(
    ctx: &Ctx<'a>,
    function: &Function<'a>,
    args: impl IntoArgs<'a>,
) -> Result<Value<'a>, Box<dyn Error>> {
    ic_cdk::println!("about to call JS function");

    // TODO I don't think we can consider this always a macrotask...think about this
    // JavaScript macrotask
    let result: Value = match function.call(args) {
        Ok(value) => value,
        Err(_) => trap_on_last_exception(ctx)?,
    };

    ic_cdk::println!("JS function call is complete");

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

    ic_cdk::println!("about to drain microtasks");

    // We consider the function.call above to be a JavaScript macrotask,
    // thus we drain all JavaScript microtasks queued during its execution
    drain_microtasks(ctx);

    ic_cdk::println!("microtasks have been drained");

    Ok(result)
}
