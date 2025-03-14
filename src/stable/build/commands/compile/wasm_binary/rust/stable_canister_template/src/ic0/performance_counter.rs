use ic0::performance_counter;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |counter_type: i32| -> i64 {
        unsafe { performance_counter(counter_type) }
    })
}
