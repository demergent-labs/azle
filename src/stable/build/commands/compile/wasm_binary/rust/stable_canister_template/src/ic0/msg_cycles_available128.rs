use ic0::msg_cycles_available128;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |dst: i32| -> () {
        unsafe { msg_cycles_available128(dst) }
    })
}
