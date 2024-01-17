use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let max_amount_string = if let JsValue::String(js_string) = argv.get(0).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };
        let max_amount: u64 = max_amount_string.parse().unwrap();

        context
            .new_string(&ic_cdk::api::call::msg_cycles_accept(max_amount).to_string())
            .into()
    }
}
