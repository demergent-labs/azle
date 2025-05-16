use ic_cdk::api::msg_method_name;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> String { msg_method_name() })
}
