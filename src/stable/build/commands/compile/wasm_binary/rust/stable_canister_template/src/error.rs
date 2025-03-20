use std::error::Error;

use ic_cdk::trap;
use rquickjs::{
    Ctx, Exception, Function, Promise, Value, function::IntoArgs, promise::PromiseState,
};

pub fn quickjs_call_with_error_handling<'a>(
    ctx: &Ctx<'a>,
    function: &Function<'a>,
    args: impl IntoArgs<'a>,
) -> Result<Value<'a>, Box<dyn Error>> {
    let result: Value = match function.call(args) {
        Ok(value) => value,
        Err(_) => trap_on_last_exception(ctx.clone())?,
    };

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
    match promise.state() {
        PromiseState::Rejected => {
            promise.result::<Value>();
            trap_on_last_exception(ctx.clone())?;
        }
        _ => {}
    };

    Ok(())
}
