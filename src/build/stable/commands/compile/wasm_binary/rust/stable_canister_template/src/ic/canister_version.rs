use ic_cdk::api::canister_version;
use rquickjs::{BigInt, Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move || {
        BigInt::from_u64(ctx.clone(), canister_version())
    })
}
