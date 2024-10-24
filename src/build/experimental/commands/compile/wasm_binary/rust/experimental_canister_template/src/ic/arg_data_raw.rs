use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, _this_val: JsValue, _argv: &[JsValue]) -> JsValue {
        context
            .new_array_buffer(&ic_cdk::api::call::arg_data_raw())
            .into()
    }
}
