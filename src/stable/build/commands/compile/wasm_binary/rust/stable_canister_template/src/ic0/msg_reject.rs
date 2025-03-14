use ic0::msg_reject;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |src: i32, size: i32| -> () {
        unsafe { msg_reject(src, size) }
    })
}
