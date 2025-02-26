use candid_parser::{IDLProg, TypeEnv, bindings::typescript_and_javascript::compile, check_prog};
use wasm_bindgen::prelude::{JsValue, wasm_bindgen};

/// Converts a Candid service string to its corresponding TypeScript types and JavaScript IDL types.
///
/// These types can be used with `@query`/`@update`/other method decorators and for inter-canister calls using the `call` function.
///
/// # Parameters
///
/// * `candid` - A string containing a valid Candid service definition
///
/// # Returns
///
/// TypeScript types and JavaScript IDL types as a string on success,
/// or an error message if parsing or compilation fails
/// ```
#[wasm_bindgen]
pub fn candid_to_ts_js(candid: String) -> Result<JsValue, JsValue> {
    let ast: IDLProg = candid
        .parse()
        .map_err(|e| JsValue::from_str(&format!("Failed to parse Candid: {e}")))?;

    let mut env = TypeEnv::new();

    let actor = check_prog(&mut env, &ast)
        .map_err(|e| JsValue::from_str(&format!("Failed to type check Candid: {e}")))?;

    let ts_js = compile(&env, &actor);

    Ok(JsValue::from_str(&ts_js))
}
