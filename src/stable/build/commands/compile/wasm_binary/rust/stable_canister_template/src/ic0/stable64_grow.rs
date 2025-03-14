use ic0::stable64_grow;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |new_pages: i64| -> i64 {
        unsafe { stable64_grow(new_pages) }
    })
}
