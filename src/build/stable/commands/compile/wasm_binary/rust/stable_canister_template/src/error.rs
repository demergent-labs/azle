use std::error::Error;

use ic_cdk::trap;
use rquickjs::{
    function::IntoArgs, promise::PromiseState, Ctx, Exception, Function, Promise, Value,
};

use crate::quickjs_with_ctx::run_event_loop;

pub fn quickjs_call_with_error_handling<'a>(
    ctx: Ctx<'a>,
    function: Function<'a>,
    args: impl IntoArgs<'a>,
) -> Result<Value<'a>, Box<dyn Error>> {
    let result: Value = match function.call(args) {
        Ok(value) => value,
        Err(_) => trap_on_last_exception(ctx.clone())?,
    };

    // TODO we run the event loop here and also in handle_promise_error, is that a problem?
    run_event_loop(ctx.clone());

    if result.is_promise() {
        let promise: Promise = result
            .clone()
            .into_promise()
            .ok_or("Failed to convert function call return JS value to promise")?;
        handle_promise_error(ctx.clone(), promise)?;
    }

    Ok(result)
}

fn trap_on_last_exception<T>(ctx: Ctx) -> Result<T, Box<dyn Error>> {
    let exception: Exception = ctx
        .clone()
        .catch()
        .as_exception()
        .ok_or("No exception found")?
        .clone();

    trap(&exception.to_string());
}

pub fn handle_promise_error(ctx: Ctx, promise: Promise) -> Result<(), Box<dyn Error>> {
    run_event_loop(ctx.clone());

    match promise.state() {
        PromiseState::Rejected => {
            promise.result::<Value>();
            trap_on_last_exception(ctx.clone())?;
        }
        _ => {}
    };

    Ok(())
}
