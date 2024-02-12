use wasmedge_quickjs::{Context, JsArrayBuffer, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let candid_string = if let JsValue::String(js_string) = argv.get(0).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };

        let candid_args = candid_parser::parse_idl_args(&candid_string).unwrap();
        let candid_encoded = candid_args.to_bytes().unwrap();

        context.new_array_buffer(&candid_encoded).into()
    }
}
