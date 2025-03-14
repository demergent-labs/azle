use ic0::accept_message;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> () { unsafe { accept_message() } })
}
