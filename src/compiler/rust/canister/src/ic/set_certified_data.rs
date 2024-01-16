use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let certified_data_bytes =
            if let JsValue::ArrayBuffer(js_array_buffer) = argv.get(0).unwrap() {
                js_array_buffer.to_vec()
            } else {
                panic!("conversion from JsValue to JsArrayBuffer failed")
            };

        ic_cdk::api::set_certified_data(&certified_data_bytes);

        JsValue::UnDefined
    }
}
