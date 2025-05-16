use ic_cdk::api::msg_reject_msg;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> String { msg_reject_msg() })
}
