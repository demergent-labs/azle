use ic_cdk::api::call::arg_data_raw;
use rquickjs::{Ctx, Function, Result, TypedArray};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move || {
        TypedArray::<u8>::new(ctx.clone(), arg_data_raw())
    })
}
