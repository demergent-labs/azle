use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let counter_type = if let JsValue::Int(js_int) = argv.get(0).unwrap() {
            if *js_int >= 0 {
                *js_int as u32
            } else {
                panic!("counter_type cannot be negative")
            }
        } else {
            panic!("conversion from JsValue to JsInt failed")
        };

        ic_cdk::api::call::performance_counter(counter_type).into()
    }
}
