use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let new_pages_string = if let JsValue::String(js_string) = argv.get(0).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };

        context
            .new_string(
                &ic_cdk::api::stable::stable_grow(new_pages_string.parse().unwrap())
                    .unwrap()
                    .to_string(),
            )
            .into()
    }
}
