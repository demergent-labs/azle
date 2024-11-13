use ic_cdk::id;
use rquickjs::{Ctx, Function, Result, TypedArray};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move || -> Result<TypedArray<u8>> {
        TypedArray::<u8>::new(ctx.clone(), id().as_slice())
    })
}
