use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let timer_id_string = if let JsValue::String(js_string) = argv.get(0).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };
        let timer_id_u64: u64 = timer_id_string.parse().unwrap();
        let timer_id = ic_cdk_timers::TimerId::from(slotmap::KeyData::from_ffi(timer_id_u64));

        ic_cdk_timers::clear_timer(timer_id);

        JsValue::UnDefined
    }
}
