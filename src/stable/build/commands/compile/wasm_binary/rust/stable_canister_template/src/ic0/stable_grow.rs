use ic0::stable_grow;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |new_pages: i32| -> i32 {
        unsafe { stable_grow(new_pages) }
    })
}
