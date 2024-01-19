use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        context
            .new_string(&ic_cdk::api::call::arg_data_raw_size().to_string())
            .into()
    }
}
