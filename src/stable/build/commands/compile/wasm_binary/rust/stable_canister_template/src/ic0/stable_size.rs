use ic0::stable_size;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> i32 { unsafe { stable_size() } })
}
