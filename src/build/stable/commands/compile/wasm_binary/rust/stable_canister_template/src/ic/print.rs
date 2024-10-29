use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |message: String| {
        ic_cdk::print(message);
    })
}
