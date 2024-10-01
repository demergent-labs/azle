use std::convert::TryInto;

use rquickjs::{Context, Ctx, Function, Value};

pub fn get_function(context: Ctx) -> rquickjs::Function {
    Function::new(context.clone(), |bytes: rquickjs::TypedArray<u8>| {
        ic_cdk::api::call::reply_raw(bytes.as_ref());
    })
    .unwrap()
}
