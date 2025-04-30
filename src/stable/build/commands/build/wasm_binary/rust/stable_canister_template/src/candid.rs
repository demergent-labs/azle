use std::{error::Error, ffi::CString, os::raw::c_char};

use ic_cdk::trap;
use rquickjs::Function;

use crate::{
    initialize_context::{WasmEnvironment, initialize_context},
    rquickjs_utils::{call_with_error_handling, with_ctx},
    wasm_binary_manipulation::{get_js_code, get_wasm_data},
};

type CCharPtr = *mut c_char;

#[unsafe(no_mangle)]
pub fn get_candid_and_method_meta_pointer() -> CCharPtr {
    match initialize_and_get_candid() {
        Ok(c_char_ptr) => c_char_ptr,
        Err(error) => {
            trap(&format!("Candid and MethodMeta generation failed: {error}"));
        }
    }
}

fn initialize_and_get_candid() -> Result<CCharPtr, Box<dyn Error>> {
    let js = get_js_code()?;
    let wasm_data = get_wasm_data()?;

    initialize_context(js, &wasm_data.main_js_path, WasmEnvironment::Nodejs, None)?;

    with_ctx(|ctx| {
        let get_candid_and_method_meta: Function = ctx
            .globals()
            .get("_azleGetCandidAndMethodMeta")
            .map_err(|e| format!("Failed to get globalThis._azleGetCandidAndMethodMeta: {e}"))?;

        let candid_and_method_meta_js_value =
            call_with_error_handling(&ctx, &get_candid_and_method_meta, ())?;

        let candid_and_method_meta: String = candid_and_method_meta_js_value
            .as_string()
            .ok_or("Failed to convert candidAndMethodMeta JS value to string")?
            .to_string()?;

        let c_string = CString::new(candid_and_method_meta)?;
        let c_char_ptr = c_string.into_raw();

        Ok(c_char_ptr)
    })
}
