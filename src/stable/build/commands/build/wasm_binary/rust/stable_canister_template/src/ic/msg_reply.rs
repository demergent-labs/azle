use ic_cdk::api::msg_reply;
use rquickjs::{Ctx, Function, Result, TypedArray};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |bytes: TypedArray<u8>| -> () {
        msg_reply::<&[u8]>(bytes.as_ref())
    })
}
