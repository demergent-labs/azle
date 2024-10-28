use rquickjs::{Ctx, Function, Result, TypedArray};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move || {
        TypedArray::<u8>::new(ctx.clone(), ic_cdk::api::caller().as_slice())
    })
}
