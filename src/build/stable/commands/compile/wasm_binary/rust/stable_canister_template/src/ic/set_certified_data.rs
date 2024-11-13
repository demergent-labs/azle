use ic_cdk::api::set_certified_data;
use rquickjs::{Ctx, Function, Result, TypedArray};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |bytes: TypedArray<u8>| {
        set_certified_data(bytes.as_ref())
    })
}
