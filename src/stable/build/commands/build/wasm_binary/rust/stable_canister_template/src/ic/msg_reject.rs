use ic_cdk::api::msg_reject;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |message: String| -> () { msg_reject(&message) })
}
