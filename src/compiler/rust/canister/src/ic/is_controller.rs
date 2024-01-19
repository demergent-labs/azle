use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let principal_bytes = if let JsValue::ArrayBuffer(js_array_buffer) = argv.get(0).unwrap() {
            js_array_buffer.to_vec()
        } else {
            panic!("conversion from JsValue to JsArrayBuffer failed")
        };

        let principal = candid::Principal::from_slice(&principal_bytes);

        ic_cdk::api::is_controller(&principal).into()
    }
}
