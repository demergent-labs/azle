use ic_cdk::api::certified_data_set;
use rquickjs::{Ctx, Function, Result, TypedArray};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |bytes: TypedArray<u8>| -> () {
        certified_data_set::<&[u8]>(bytes.as_ref())
    })
}
