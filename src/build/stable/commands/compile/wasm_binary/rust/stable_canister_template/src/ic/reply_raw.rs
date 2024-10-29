use ic_cdk::api::call::reply_raw;
use rquickjs::{Ctx, Function, Result, TypedArray};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |bytes: TypedArray<u8>| reply_raw(bytes.as_ref()))
}
