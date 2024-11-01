use ic_cdk::print;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |message: String| {
        print(message);
    })
}
