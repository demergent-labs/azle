use candid_parser::{bindings::typescript_and_javascript::compile, check_prog, IDLProg, TypeEnv};
use wasm_bindgen::prelude::{wasm_bindgen, JsValue};

#[wasm_bindgen]
pub fn candid_to_ts_js(candid: String) -> Result<JsValue, JsValue> {
    let ast: IDLProg = candid.parse().unwrap();

    let mut env = TypeEnv::new();

    let actor = check_prog(&mut env, &ast).unwrap();
    let ts_js = compile(&env, &actor);

    Ok(JsValue::from_str(&ts_js))
}
