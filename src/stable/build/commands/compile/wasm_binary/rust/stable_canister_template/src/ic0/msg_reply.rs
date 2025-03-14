use ic0::msg_reply;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> () { unsafe { msg_reply() } })
}
