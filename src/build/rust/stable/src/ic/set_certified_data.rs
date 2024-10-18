use rquickjs::{Ctx, Function};

pub fn get_function(context: Ctx) -> Function {
    Function::new(context, |bytes: rquickjs::TypedArray<u8>| {
        ic_cdk::api::set_certified_data(bytes.as_ref());
    })
    .unwrap()
}
