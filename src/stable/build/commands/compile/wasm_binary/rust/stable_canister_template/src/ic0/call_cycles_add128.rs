use ic0::call_cycles_add128;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |amount_high: i64, amount_low: i64| -> () {
        unsafe { call_cycles_add128(amount_high, amount_low) }
    })
}
