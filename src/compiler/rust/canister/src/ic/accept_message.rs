use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(_context: &mut Context, _this_val: JsValue, _argv: &[JsValue]) -> JsValue {
        ic_cdk::api::call::accept_message();

        JsValue::UnDefined
    }
}
