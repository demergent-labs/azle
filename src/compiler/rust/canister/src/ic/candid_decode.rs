use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let candid_encoded = if let JsValue::ArrayBuffer(js_array_buffer) = argv.get(0).unwrap() {
            js_array_buffer.to_vec()
        } else {
            panic!("conversion from JsValue to JsArrayBuffer failed")
        };

        let candid_args: candid::IDLArgs = candid::IDLArgs::from_bytes(&candid_encoded).unwrap();
        let candid_string = candid_args.to_string();

        context.new_string(&candid_string).into()
    }
}
