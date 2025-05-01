use rand::RngCore;
use wasmedge_quickjs::{Context, JsFn, JsValue};

use crate::CSPRNG;

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, _this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let byte_length = if let JsValue::Int(js_int) = argv.get(0).unwrap() {
            *js_int as usize
        } else {
            panic!("conversion from JsValue to JsValue::Int failed")
        };

        CSPRNG.with(|csprng_refcell| {
            let mut rng = csprng_refcell.borrow_mut();

            let mut bytes = vec![0; byte_length];

            rng.fill_bytes(bytes.as_mut_slice());

            context.new_array_buffer(&bytes).into()
        })
    }
}
