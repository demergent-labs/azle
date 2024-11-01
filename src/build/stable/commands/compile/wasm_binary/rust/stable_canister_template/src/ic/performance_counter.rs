use ic_cdk::api::performance_counter;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |counter_type: u32| -> u64 {
        performance_counter(counter_type)
    })
}
