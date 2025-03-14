use ic0::msg_caller_size;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> i32 { unsafe { msg_caller_size() } })
}
