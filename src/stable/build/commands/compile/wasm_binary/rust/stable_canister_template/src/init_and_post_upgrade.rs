use std::error::Error;

use ic_cdk::trap;
use ic_stable_structures::memory_manager::MemoryId;
use ic_wasi_polyfill::init_with_memory;

use crate::{
    MEMORY_MANAGER_REF_CELL,
    execute_method_js::execute_method_js,
    initialize_context::{WasmEnvironment, initialize_context},
    wasm_binary_manipulation::{get_js_code, get_wasm_data},
};

#[inline(never)]
#[unsafe(no_mangle)]
pub extern "C" fn init(function_index: i32) {
    // Without something like this to make the function bodies different,
    // the init and post_upgrade functions
    // seem to be optimized into the same function in the Wasm binary
    // This causes problems during Wasm binary manipulation
    let _ = format!("prevent init and post_upgrade optimization");

    if let Err(e) = initialize(true, function_index) {
        trap(&format!("Azle InitError: {}", e));
    }
}

#[inline(never)]
#[unsafe(no_mangle)]
pub extern "C" fn post_upgrade(function_index: i32) {
    if let Err(e) = initialize(false, function_index) {
        trap(&format!("Azle PostUpgradeError: {}", e));
    }
}

fn initialize(init: bool, function_index: i32) -> Result<(), Box<dyn Error>> {
    let js = get_js_code()?;

    let wasm_data = get_wasm_data()?;

    let env_vars: Vec<(&str, &str)> = wasm_data
        .env_vars
        .iter()
        .map(|(key, value)| (key.as_str(), value.as_str()))
        .collect();

    let polyfill_memory =
        MEMORY_MANAGER_REF_CELL.with(|manager| manager.borrow().get(MemoryId::new(254)));

    init_with_memory(&[], &env_vars, polyfill_memory);

    initialize_context(
        js,
        &wasm_data.main_js_path,
        WasmEnvironment::IcpReplica,
        Some(init),
    )?;

    execute_developer_init_or_post_upgrade(function_index);

    Ok(())
}

fn execute_developer_init_or_post_upgrade(function_index: i32) {
    if function_index != -1 {
        execute_method_js(function_index);
    }
}
