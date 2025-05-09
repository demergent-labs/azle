use ic_cdk::api::msg_cycles_available;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> String { msg_cycles_available().to_string() })
}
