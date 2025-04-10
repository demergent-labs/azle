use rand::{SeedableRng, rngs::StdRng};
use wasmedge_quickjs::{Context, JsFn, JsValue};

use crate::CSPRNG;

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(_context: &mut Context, _this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let seed = if let JsValue::ArrayBuffer(js_array_buffer) = argv.get(0).unwrap() {
            js_array_buffer.to_vec()
        } else {
            panic!("conversion from JsValue to JsValue::ArrayBuffer failed");
        };

        rand_seed(
            seed.try_into()
                .expect("seed must be exactly 32 bytes in length"),
        );

        JsValue::UnDefined
    }
}

pub fn rand_seed(seed: [u8; 32]) {
    CSPRNG.with(|csprng_refcell| {
        let mut rng = csprng_refcell.borrow_mut();

        *rng = StdRng::from_seed(seed);
    });
}
