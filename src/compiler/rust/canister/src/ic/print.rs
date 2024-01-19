use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let first_arg_option = argv.get(0);

        if let Some(first_arg) = first_arg_option {
            let string_to_print = first_arg.clone().to_string().unwrap().to_string();
            ic_cdk::print(string_to_print);
        } else {
            ic_cdk::print("");
        }

        JsValue::UnDefined
    }
}
