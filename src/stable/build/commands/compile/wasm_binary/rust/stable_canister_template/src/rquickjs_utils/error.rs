use std::error::Error;

use ic_cdk::trap;
use rquickjs::{Ctx, Exception, Promise, Value, promise::PromiseState};

pub fn handle_promise_error(ctx: &Ctx, promise: &Promise) -> Result<(), Box<dyn Error>> {
    match promise.state() {
        PromiseState::Rejected => {
            promise.result::<Value>();
            trap_on_last_exception(ctx)?;
        }
        _ => {}
    };

    Ok(())
}

pub fn trap_on_last_exception<T>(ctx: &Ctx) -> Result<T, Box<dyn Error>> {
    let exception: Exception = ctx
        .clone()
        .catch()
        .as_exception()
        .ok_or("No exception found")?
        .clone();

    trap(&exception.to_string());
}
