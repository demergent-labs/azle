use rand::RngCore;
use wasmedge_quickjs::{Context, JsFn, JsValue};

use crate::INTERNAL_CSPRNG;

pub struct NativeFunction;
impl JsFn for NativeFunction {
    /// This function is intended to be used to generate unique identifiers that the end-user developer cannot influence through re-seeding.
    /// This function removes the risk of an end-user developer repeating a seed and thus potentially causing collisions in unique identifiers.
    /// Any functionality that relies on Azle's implementation of `crypto.getRandomValues` or `randBytes` is subject to the re-seeding risk.
    /// Thus by default any internal unique identifiers in the Azle JavaScript runtime should be generated using this function or another method not subject to re-seeding risk.
    fn call(context: &mut Context, _this_val: JsValue, _argv: &[JsValue]) -> JsValue {
        INTERNAL_CSPRNG.with(|csprng_refcell| {
            let mut rng = csprng_refcell.borrow_mut();

            let mut bytes = [0u8; 16];

            rng.fill_bytes(&mut bytes);

            let hex = format!("{:032x}", u128::from_be_bytes(bytes));

            context.new_string(&hex).into()
        })
    }
}
