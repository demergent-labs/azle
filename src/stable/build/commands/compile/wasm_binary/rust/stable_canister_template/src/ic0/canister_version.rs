use ic0::canister_version;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> i64 { unsafe { canister_version() } })
}
