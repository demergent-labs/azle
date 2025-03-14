use ic0::msg_cycles_accept;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |max_amount: i64| -> i64 {
        unsafe { msg_cycles_accept(max_amount) }
    })
}
