// TODO it would be great to use an actual u128 conversion available from the bindings instead of using a string

use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        context
            .new_string(&ic_cdk::api::canister_balance128().to_string())
            .into()
    }
}
