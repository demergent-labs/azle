use ic_cdk::api::in_replicated_execution;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> bool { in_replicated_execution() })
}
