use candid::Principal;
use ic_cdk::api::is_controller;
use rquickjs::{Ctx, Function, Result, TypedArray};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |principal_bytes: TypedArray<u8>| {
        let principal = Principal::from_slice(principal_bytes.as_ref());

        is_controller(&principal)
    })
}
