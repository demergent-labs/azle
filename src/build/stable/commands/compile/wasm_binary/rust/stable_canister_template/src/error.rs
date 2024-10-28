use std::error::Error;

use rquickjs::function::IntoArgs;

use crate::quickjs_with_ctx::run_event_loop;

pub fn quickjs_call_with_error_handling<'a>(
    ctx: rquickjs::Ctx<'a>,
    function: rquickjs::Function<'a>,
    args: impl IntoArgs<'a>,
) -> Result<rquickjs::Value<'a>, Box<dyn std::error::Error>> {
    let result: rquickjs::Value = match function.call(args) {
        Ok(value) => value,
        Err(_) => trap_on_last_exception(ctx.clone())?,
    };

    // TODO we run the event loop here and also in handle_promise_error, is that a problem?
    run_event_loop(ctx.clone());

    if result.is_promise() {
        let promise: rquickjs::Promise = result
            .clone()
            .into_promise()
            .ok_or("Failed to convert function call return JS value to promise")?;
        handle_promise_error(ctx.clone(), promise)?;
    }

    Ok(result)
}

fn trap_on_last_exception<T>(ctx: rquickjs::Ctx) -> Result<T, Box<dyn std::error::Error>> {
    let exception: rquickjs::Exception = ctx
        .clone()
        .catch()
        .as_exception()
        .ok_or("No exception found")?
        .clone();

    ic_cdk::trap(&exception.to_string());
}

pub fn handle_promise_error(
    ctx: rquickjs::Ctx,
    promise: rquickjs::Promise,
) -> Result<(), Box<dyn Error>> {
    run_event_loop(ctx.clone());

    match promise.state() {
        rquickjs::promise::PromiseState::Rejected => {
            promise.result::<rquickjs::Value>();
            trap_on_last_exception(ctx.clone())?;
        }
        _ => {}
    };

    Ok(())
}
