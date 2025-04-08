use ic_cdk::api::time;
use rquickjs::{BigInt, Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move || -> Result<BigInt> {
        BigInt::from_u64(ctx.clone(), time())
    })
}
