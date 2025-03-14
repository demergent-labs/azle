use ic0::call_data_append;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |src: i32, size: i32| -> () {
        unsafe { call_data_append(src, size) }
    })
}
