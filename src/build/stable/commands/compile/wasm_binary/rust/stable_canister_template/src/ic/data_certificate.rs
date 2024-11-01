use ic_cdk::api::data_certificate;
use rquickjs::{Ctx, Function, IntoJs, Result, TypedArray, Undefined, Value};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move || -> Result<Value> {
        match data_certificate() {
            Some(data_certificate_vec_u8) => {
                TypedArray::<u8>::new(ctx.clone(), data_certificate_vec_u8)?.into_js(&ctx)
            }
            None => Undefined.into_js(&ctx),
        }
    })
}
