use ic_cdk::api::debug_print;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |message: String| -> () {
        debug_print(message);
    })
}
