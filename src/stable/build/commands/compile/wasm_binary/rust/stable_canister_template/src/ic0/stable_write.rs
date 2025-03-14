use ic0::stable_write;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |offset: i32, src: i32, size: i32| -> () {
        unsafe { stable_write(offset, src, size) }
    })
}
