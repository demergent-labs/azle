#[cfg(feature = "experimental")]
use open_value_sharing::Consumer;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct WasmData {
    #[serde(rename = "envVars")]
    pub env_vars: Vec<(String, String)>,
    #[cfg(feature = "experimental")]
    pub consumer: Consumer,
    #[cfg(feature = "experimental")]
    #[serde(rename = "managementDid")]
    pub management_did: String,
}

#[inline(never)]
#[no_mangle]
extern "C" fn init_js_passive_data(js_vec_location: i32) -> usize {
    "123_456_789".parse::<usize>().unwrap() + js_vec_location as usize // TODO must be like this for weird optimization reasons
}

// TODO seems we need to do this to stop the compiler from hard-coding the result of this function where it is called
// TODO hopefully there's a less hacky way to do this
#[inline(never)]
#[no_mangle]
extern "C" fn js_passive_data_size() -> usize {
    "123_456_789".parse().unwrap()
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
    "123_456_789".parse::<usize>().unwrap() + wasm_data_vec_location as usize // TODO must be like this for weird optimization reasons
}

// TODO seems we need to do this to stop the compiler from hard-coding the result of this function where it is called
// TODO hopefully there's a less hacky way to do this
#[inline(never)]
#[no_mangle]
extern "C" fn wasm_data_passive_data_size() -> usize {
    "123_456_789".parse().unwrap()
}

// TODO waiting on license inspired from https://github.com/adambratschikaye/wasm-inject-data/blob/main/src/static_wasm.rs
pub fn get_wasm_data() -> WasmData {
    let size = wasm_data_passive_data_size();
    let mut wasm_data_vec = vec![243; size];
    let wasm_data_vec_location = wasm_data_vec.as_mut_ptr() as i32;

    init_wasm_data_passive_data(wasm_data_vec_location);

    serde_json::from_str(std::str::from_utf8(&wasm_data_vec).unwrap()).unwrap()
}
