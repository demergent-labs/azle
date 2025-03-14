use ic0::trap;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |src: i32, size: i32| -> () {
        unsafe { trap(src, size) }
    })
}
