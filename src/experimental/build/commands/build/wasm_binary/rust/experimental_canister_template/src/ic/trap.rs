use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(_context: &mut Context, _this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let message = if let JsValue::String(js_string) = argv.get(0).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };

        ic_cdk::api::trap(&message);
    }
}
