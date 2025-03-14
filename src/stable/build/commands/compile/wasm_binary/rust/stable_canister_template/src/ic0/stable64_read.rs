use ic0::stable64_read;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |dst: i64, offset: i64, size: i64| -> () {
        unsafe { stable64_read(dst, offset, size) }
    })
}
