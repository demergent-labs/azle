use rquickjs::{Context, Ctx, Function, TypedArray};

pub fn get_function(context: Ctx) -> Function {
    Function::new(context.clone(), move |principal_array: TypedArray<u8>| {
        let principal_bytes = principal_array.as_ref();
        let principal = candid::Principal::from_slice(principal_bytes);

        ic_cdk::api::is_controller(&principal)
    })
    .unwrap()
}
