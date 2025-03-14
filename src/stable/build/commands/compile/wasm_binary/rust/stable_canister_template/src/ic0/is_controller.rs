use ic0::is_controller;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |src: i32, size: i32| -> i32 {
        unsafe { is_controller(src, size) }
    })
}
