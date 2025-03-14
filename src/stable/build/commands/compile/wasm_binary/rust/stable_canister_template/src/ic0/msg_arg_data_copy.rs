use ic0::msg_arg_data_copy;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |dst: i32, offset: i32, size: i32| -> () {
        unsafe { msg_arg_data_copy(dst, offset, size) }
    })
}
