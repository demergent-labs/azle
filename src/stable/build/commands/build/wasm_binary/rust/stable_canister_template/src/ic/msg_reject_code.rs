use ic_cdk::api::msg_reject_code;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> u32 { msg_reject_code() })
}
