use ic0::call_on_cleanup;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |fun: i32, env: i32| -> () {
        unsafe { call_on_cleanup(fun, env) }
    })
}
