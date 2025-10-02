use candid_parser::{
    bindings::{javascript, typescript},
    check_prog, syntax::IDLMergedProg, IDLProg, TypeEnv,
};
use wasm_bindgen::prelude::{wasm_bindgen, JsValue};

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

    // Create IDLMergedProg from the AST for TypeScript compilation
    let merged_prog = IDLMergedProg::new(ast);

    // Generate TypeScript types
    let ts = typescript::compile(&env, &actor, &merged_prog);

    // Generate JavaScript IDL
    let js = javascript::compile(&env, &actor);

    // Combine TypeScript and JavaScript outputs
    let result = format!("{}\n{}", ts, js);

    Ok(JsValue::from_str(&result))
}
