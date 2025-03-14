use ic0::stable64_write;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |offset: i64, src: i64, size: i64| -> () {
        unsafe { stable64_write(offset, src, size) }
    })
}
