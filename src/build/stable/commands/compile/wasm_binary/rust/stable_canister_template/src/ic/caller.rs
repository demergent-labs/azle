use rquickjs::{Ctx, Function, Result, TypedArray};

pub fn get_function(context: Ctx) -> Result<Function> {
    Function::new(context.clone(), move || {
        TypedArray::<u8>::new(context.clone(), ic_cdk::api::caller().as_slice())
    })
}
