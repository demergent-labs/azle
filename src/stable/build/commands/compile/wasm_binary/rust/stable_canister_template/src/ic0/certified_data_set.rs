use ic0::certified_data_set;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |src: i32, size: i32| -> () {
        unsafe { certified_data_set(src, size) }
    })
}
