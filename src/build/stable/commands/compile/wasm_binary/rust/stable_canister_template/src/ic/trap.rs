use ic_cdk::api::trap;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |message: String| trap(&message))
}
