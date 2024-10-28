use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || {
        ic_cdk::api::call::accept_message();
    })
}
