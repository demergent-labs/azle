use ic0::in_replicated_execution;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> i32 { unsafe { in_replicated_execution() } })
}
