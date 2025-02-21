use core::ptr::read_volatile;
use std::{error::Error, str};

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
extern "C" fn init_js_passive_data(js_vec_location: i32) {
    // Without something like this to make the function bodies different,
    // the init_js_passive_data and init_wasm_data_passive_data functions
    // seem to be optimized into the same function in the Wasm binary
    // This causes problems during Wasm binary manipulation
    let _ = format!("prevent init_js_passive_data and init_wasm_data_passive_data optimization");

    // This is used to prevent compiler optimizations that interfere with the Wasm binary manipulation
    unsafe { read_volatile(&js_vec_location) };
}

// Used to provide a safe value for the read_volatile and to differentiate between the
// js_passive_data_size and wasm_data_passive_data_size function bodies
// Without this problems happen during Wasm binary manipulation
static JS_PASSIVE_DATA_SIZE: usize = 0;

#[inline(never)]
#[no_mangle]
extern "C" fn js_passive_data_size() -> usize {
    // This is used to prevent compiler optimizations that interfere with the Wasm binary manipulation
    unsafe { read_volatile(&JS_PASSIVE_DATA_SIZE) }
}

// TODO waiting on license inspired from https://github.com/adambratschikaye/wasm-inject-data/blob/main/src/static_wasm.rs
pub fn get_js_code() -> Result<Vec<u8>, Box<dyn Error>> {
    let size = js_passive_data_size();

    let mut js_vec = vec![243; size];

    // This cast to usize appears to be well defined and safe
    let js_vec_location = js_vec.as_mut_ptr() as usize;

    init_js_passive_data(i32::try_from(js_vec_location)?);

    Ok(js_vec)
}

#[inline(never)]
#[no_mangle]
extern "C" fn init_wasm_data_passive_data(wasm_data_vec_location: i32) {
    // This is used to prevent compiler optimizations that interfere with the Wasm binary manipulation
    unsafe { read_volatile(&wasm_data_vec_location) };
}

// Used to provide a safe value for the read_volatile and to differentiate between the
// js_passive_data_size and wasm_data_passive_data_size function bodies
// Without this problems happen during Wasm binary manipulation
static WASM_DATA_PASSIVE_DATA_SIZE: usize = 0;

#[inline(never)]
#[no_mangle]
extern "C" fn wasm_data_passive_data_size() -> usize {
    // This is used to prevent compiler optimizations that interfere with the Wasm binary manipulation
    unsafe { read_volatile(&WASM_DATA_PASSIVE_DATA_SIZE) }
}

// TODO waiting on license inspired from https://github.com/adambratschikaye/wasm-inject-data/blob/main/src/static_wasm.rs
pub fn get_wasm_data() -> Result<WasmData, Box<dyn Error>> {
    let size = wasm_data_passive_data_size();

    let mut wasm_data_vec = vec![243; size];

    // This cast to usize appears to be well defined and safe
    let wasm_data_vec_location = wasm_data_vec.as_mut_ptr() as usize;

    init_wasm_data_passive_data(i32::try_from(wasm_data_vec_location)?);

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
