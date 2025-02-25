use ic_cdk::api::performance_counter;
use rquickjs::{BigInt, Ctx, Function, Result};

use crate::ic::throw_error;

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move |counter_type: u32| -> Result<BigInt> {
        if counter_type != 0 && counter_type != 1 {
            return Err(throw_error(
                ctx.clone(),
                "performanceCounter counterType can only be 0 or 1",
            ));
        }

        BigInt::from_u64(ctx.clone(), performance_counter(counter_type))
    })
}
