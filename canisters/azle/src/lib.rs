use boa::Context;
// use wasm_bindgen::prelude::*;

// #[wasm_bindgen]
// #[ic_cdk_macros::query]
pub fn hello() -> String {

    let mut context = Context::new();

    let value = context.eval("5+4").unwrap();

    value.as_string().unwrap().to_string()
}