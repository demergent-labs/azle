use ic_cdk::api::performance_counter;
use rquickjs::{BigInt, Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move |counter_type: u32| -> Result<BigInt> {
        BigInt::from_u64(ctx.clone(), performance_counter(counter_type))
    })
}
