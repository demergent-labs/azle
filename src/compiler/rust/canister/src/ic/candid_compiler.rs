use wasmedge_quickjs::{Context, JsArrayBuffer, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let candid_path = if let JsValue::String(js_string) = argv.get(0).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };

        let (env, actor) =
            candid_parser::pretty_check_file(std::path::Path::new(&candid_path)).unwrap();

        let result = candid_parser::bindings::javascript::compile(&env, &actor);

        context.new_string(&result).into()
    }
}
