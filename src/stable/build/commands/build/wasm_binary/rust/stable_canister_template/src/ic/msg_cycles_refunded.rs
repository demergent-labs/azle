use ic_cdk::api::msg_cycles_refunded;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> String { msg_cycles_refunded().to_string() })
}
