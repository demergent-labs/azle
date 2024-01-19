use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        context
            .new_array_buffer(&ic_cdk::api::stable::stable_bytes())
            .into()
    }
}
