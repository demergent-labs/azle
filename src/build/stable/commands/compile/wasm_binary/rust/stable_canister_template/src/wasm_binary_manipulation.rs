use std::{env, error::Error, str};

use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct WasmData {
    #[serde(rename = "envVars")]
    pub env_vars: Vec<(String, String)>,
    #[serde(rename = "mainJsPath")]
    pub main_js_path: String,
    #[serde(rename = "recordBenchmarks")]
    pub record_benchmarks: bool,
}

#[inline(never)]
#[no_mangle]
extern "C" fn init_js_passive_data(js_vec_location: i32) -> usize {
    // This is to prevent compiler optimizations that interfere with the Wasm binary manipulation
    env::var("init_js_passive_data").map_or(0, |s| s.len()) + js_vec_location as usize
}

#[inline(never)]
#[no_mangle]
extern "C" fn js_passive_data_size() -> usize {
    // This is to prevent compiler optimizations that interfere with the Wasm binary manipulation
    env::var("js_passive_data_size").map_or(0, |s| s.len())
}

// TODO waiting on license inspired from https://github.com/adambratschikaye/wasm-inject-data/blob/main/src/static_wasm.rs
pub fn get_js_code() -> Vec<u8> {
    let size = js_passive_data_size();
    let mut js_vec = vec![243; size];
    let js_vec_location = js_vec.as_mut_ptr() as i32;

    init_js_passive_data(js_vec_location);

    js_vec
}

#[inline(never)]
#[no_mangle]
extern "C" fn init_wasm_data_passive_data(wasm_data_vec_location: i32) -> usize {
    // This is to prevent compiler optimizations that interfere with the Wasm binary manipulation
    env::var("init_wasm_data_passive_data").map_or(0, |s| s.len()) + wasm_data_vec_location as usize
}

#[inline(never)]
#[no_mangle]
extern "C" fn wasm_data_passive_data_size() -> usize {
    // This is to prevent compiler optimizations that interfere with the Wasm binary manipulation
    env::var("wasm_data_passive_data_size").map_or(0, |s| s.len())
}

// TODO waiting on license inspired from https://github.com/adambratschikaye/wasm-inject-data/blob/main/src/static_wasm.rs
pub fn get_wasm_data() -> Result<WasmData, Box<dyn Error>> {
    let size = wasm_data_passive_data_size();
    let mut wasm_data_vec = vec![243; size];
    let wasm_data_vec_location = wasm_data_vec.as_mut_ptr() as i32;

    init_wasm_data_passive_data(wasm_data_vec_location);

    let wasm_data_str = str::from_utf8(&wasm_data_vec).map_err(|e| {
        format!(
            "WasmData conversion failed while converting Vec<u8> to String: {}",
            e
        )
    })?;

    let wasm_data: WasmData = serde_json::from_str(wasm_data_str).map_err(|e| {
        format!(
            "WasmData conversion failed while converting String to WasmData struct: {}",
            e
        )
    })?;

    Ok(wasm_data)
}
