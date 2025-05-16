use ic_cdk::api::msg_cycles_refunded;
use rquickjs::{BigInt, Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move || -> Result<BigInt> {
        ctx.eval::<BigInt, &str>(&format!("{}n", msg_cycles_refunded()))
    })
}
