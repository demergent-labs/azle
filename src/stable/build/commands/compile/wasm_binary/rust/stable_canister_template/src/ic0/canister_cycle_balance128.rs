use ic0::canister_cycle_balance128;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |dst: i32| -> () {
        unsafe { canister_cycle_balance128(dst) }
    })
}
