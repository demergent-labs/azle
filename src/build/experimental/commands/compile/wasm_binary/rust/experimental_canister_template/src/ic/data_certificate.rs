use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, _this_val: JsValue, _argv: &[JsValue]) -> JsValue {
        match ic_cdk::api::data_certificate() {
            Some(data_certificate_vec_u8) => {
                context.new_array_buffer(&data_certificate_vec_u8).into()
            }
            None => JsValue::UnDefined,
        }
    }
}
