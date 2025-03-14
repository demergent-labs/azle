use ic0::canister_self_size;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> i32 { unsafe { canister_self_size() } })
}
