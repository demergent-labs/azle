use ic0::global_timer_set;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |timestamp: i64| -> i64 {
        unsafe { global_timer_set(timestamp) }
    })
}
