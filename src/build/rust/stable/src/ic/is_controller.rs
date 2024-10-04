use rquickjs::{Ctx, Function, TypedArray};

pub fn get_function(context: Ctx) -> Function {
    Function::new(context, |principal_bytes: TypedArray<u8>| {
        let principal = candid::Principal::from_slice(principal_bytes.as_ref());

        ic_cdk::api::is_controller(&principal)
    })
    .unwrap()
}
