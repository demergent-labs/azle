use ic0::canister_cycle_balance;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> i64 { unsafe { canister_cycle_balance() } })
}
