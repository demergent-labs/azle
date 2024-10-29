use ic_cdk::api::call::arg_data_raw;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || arg_data_raw())
}
