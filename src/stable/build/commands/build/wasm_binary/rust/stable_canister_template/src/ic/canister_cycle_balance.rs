use ic_cdk::api::canister_cycle_balance;
use rquickjs::{BigInt, Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move || -> Result<BigInt> {
        ctx.eval::<BigInt, &str>(&format!("{}n", canister_cycle_balance()))
    })
}
