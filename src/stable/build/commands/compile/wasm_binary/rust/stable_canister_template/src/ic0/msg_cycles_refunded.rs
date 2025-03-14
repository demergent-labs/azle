use ic0::msg_cycles_refunded;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> i64 { unsafe { msg_cycles_refunded() } })
}
