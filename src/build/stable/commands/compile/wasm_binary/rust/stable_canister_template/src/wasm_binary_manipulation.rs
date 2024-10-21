use std::error::Error;

use serde::{Deserialize, Serialize};

use crate::AzleError;

#[derive(Debug, Serialize, Deserialize)]
pub struct WasmData {
    #[serde(rename = "envVars")]
    pub env_vars: Vec<(String, String)>,
}

#[inline(never)]
#[no_mangle]
extern "C" fn init_js_passive_data(js_vec_location: i32) -> usize {
    // This is to prevent compiler optimizations that interfere with the Wasm binary manipulation
    std::env::var("init_js_passive_data").map_or(0, |s| s.len()) + js_vec_location as usize
}

#[inline(never)]
#[no_mangle]
extern "C" fn js_passive_data_size() -> usize {
    // This is to prevent compiler optimizations that interfere with the Wasm binary manipulation
    std::env::var("js_passive_data_size").map_or(0, |s| s.len())
}

// TODO waiting on license inspired from https://github.com/adambratschikaye/wasm-inject-data/blob/main/src/static_wasm.rs
pub fn get_js_code() -> Result<Vec<u8>, Box<dyn Error>> {
    let size = js_passive_data_size();
    let mut js_vec = vec![243; size];
    let js_vec_location = js_vec.as_mut_ptr() as i32;

    init_js_passive_data(js_vec_location);

    Ok(js_vec)
}

#[inline(never)]
#[no_mangle]
extern "C" fn init_wasm_data_passive_data(wasm_data_vec_location: i32) -> usize {
    // This is to prevent compiler optimizations that interfere with the Wasm binary manipulation
    std::env::var("init_wasm_data_passive_data").map_or(0, |s| s.len())
        + wasm_data_vec_location as usize
}

#[inline(never)]
#[no_mangle]
extern "C" fn wasm_data_passive_data_size() -> usize {
    // This is to prevent compiler optimizations that interfere with the Wasm binary manipulation
    std::env::var("wasm_data_passive_data_size").map_or(0, |s| s.len())
}

// TODO waiting on license inspired from https://github.com/adambratschikaye/wasm-inject-data/blob/main/src/static_wasm.rs
pub fn get_wasm_data() -> Result<WasmData, Box<dyn Error>> {
    let size = wasm_data_passive_data_size();
    let mut wasm_data_vec = vec![243; size];
    let wasm_data_vec_location = wasm_data_vec.as_mut_ptr() as i32;

    init_wasm_data_passive_data(wasm_data_vec_location);

    let wasm_data_str = std::str::from_utf8(&wasm_data_vec)
        .map_err(|e| AzleError::WasmDataVecToString(e.into()))?;
    let wasm_data: WasmData = serde_json::from_str(wasm_data_str)
        .map_err(|e| AzleError::WasmDataStringToStruct(e.into()))?;

    Ok(wasm_data)
}
