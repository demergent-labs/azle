use ic0::msg_cycles_accept128;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(
        ctx,
        |max_amount_high: i64, max_amount_low: i64, dst: i32| -> () {
            unsafe { msg_cycles_accept128(max_amount_high, max_amount_low, dst) }
        },
    )
}
