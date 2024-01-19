use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let offset_string = if let JsValue::String(js_string) = argv.get(0).unwrap() {
            js_string.to_string() // TODO it would be great to have a direct conversion to u64 but seems the bindings don't support it
        } else {
            panic!("conversion from JsValue to JsString failed")
        };

        let length_string = if let JsValue::String(js_string) = argv.get(1).unwrap() {
            js_string.to_string() // TODO it would be great to have a direct conversion to u64 but seems the bindings don't support it
        } else {
            panic!("conversion from JsValue to JsString failed")
        };

        let mut buf: Vec<u8> = vec![0; length_string.parse().unwrap()];

        ic_cdk::api::stable::stable_read(offset_string.parse().unwrap(), &mut buf);

        context.new_array_buffer(&buf).into()
    }
}
