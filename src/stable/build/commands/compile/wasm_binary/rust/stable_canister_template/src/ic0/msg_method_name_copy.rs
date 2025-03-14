use ic0::msg_method_name_copy;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |dst: i32, offset: i32, size: i32| -> () {
        unsafe { msg_method_name_copy(dst, offset, size) }
    })
}
