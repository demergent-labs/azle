use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(_context: &mut Context, _this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let arg_0_js_value = argv.get(0).unwrap();

        match arg_0_js_value {
            JsValue::ArrayBuffer(js_array_buffer) => {
                let buf = js_array_buffer.to_vec();

                ic_cdk::api::call::reply_raw(&buf);
            }
            _ => {}
        };

        JsValue::UnDefined
    }
}
