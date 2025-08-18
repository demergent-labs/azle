use rand::RngCore;
use wasmedge_quickjs::{Context, JsFn, JsValue};

use crate::INTERNAL_CSPRNG;

pub struct NativeFunction;
impl JsFn for NativeFunction {
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
