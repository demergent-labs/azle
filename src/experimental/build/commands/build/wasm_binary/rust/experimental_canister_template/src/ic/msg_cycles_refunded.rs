use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, _this_val: JsValue, _argv: &[JsValue]) -> JsValue {
        context
            .new_string(&ic_cdk::api::msg_cycles_refunded().to_string())
            .into()
    }
}
