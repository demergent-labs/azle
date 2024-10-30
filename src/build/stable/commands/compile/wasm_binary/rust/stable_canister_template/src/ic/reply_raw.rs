use rquickjs::{Ctx, Function};

pub fn get_function(context: Ctx) -> rquickjs::Function {
    Function::new(context, |bytes: rquickjs::TypedArray<u8>| {
        ic_cdk::api::call::reply_raw(bytes.as_ref());
    })
    .unwrap()
}
