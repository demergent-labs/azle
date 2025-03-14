use ic0::stable64_size;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> i64 { unsafe { stable64_size() } })
}
