use ic0::debug_print;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |src: i32, size: i32| -> () {
        unsafe { debug_print(src, size) }
    })
}
