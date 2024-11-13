use ic_cdk::api::call::msg_cycles_refunded128;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || msg_cycles_refunded128().to_string())
}
