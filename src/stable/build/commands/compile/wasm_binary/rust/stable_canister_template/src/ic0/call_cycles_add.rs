use ic0::call_cycles_add;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |amount: i64| -> () {
        unsafe { call_cycles_add(amount) }
    })
}
