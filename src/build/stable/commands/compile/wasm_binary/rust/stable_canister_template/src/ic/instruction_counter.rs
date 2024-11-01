use ic_cdk::api::instruction_counter;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || instruction_counter())
}
