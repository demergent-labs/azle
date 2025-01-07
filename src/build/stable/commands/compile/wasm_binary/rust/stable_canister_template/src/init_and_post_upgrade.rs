use std::{env, error::Error, str};

use ic_cdk::trap;
use ic_stable_structures::memory_manager::MemoryId;
use ic_wasi_polyfill::init_with_memory;
use rquickjs::{Context, Module, Object, Runtime};

use crate::{
    error::handle_promise_error,
    execute_method_js::execute_method_js,
    ic::register,
    quickjs_with_ctx,
    wasm_binary_manipulation::{get_js_code, get_wasm_data, WasmData},
    CONTEXT_REF_CELL, MEMORY_MANAGER_REF_CELL, WASM_DATA_REF_CELL,
};

#[inline(never)]
#[no_mangle]
pub extern "C" fn init(function_index: i32, pass_arg_data: i32) {
    // Without something like this the init and post_upgrade functions
    // seem to be optimized into the same function in the Wasm binary
    // This causes problems during Wasm binary manipulation
    let _ = format!("prevent init and post_upgrade optimization");

    if let Err(e) = initialize(true, function_index, pass_arg_data) {
        trap(&format!("Azle InitError: {}", e));
    }
}

#[inline(never)]
#[no_mangle]
pub extern "C" fn post_upgrade(function_index: i32, pass_arg_data: i32) {
    if let Err(e) = initialize(false, function_index, pass_arg_data) {
        trap(&format!("Azle PostUpgradeError: {}", e));
    }
}

fn initialize(init: bool, function_index: i32, pass_arg_data: i32) -> Result<(), Box<dyn Error>> {
    let wasm_data = get_wasm_data()?;

    WASM_DATA_REF_CELL.with(|wasm_data_ref_cell| {
        *wasm_data_ref_cell.borrow_mut() = Some(wasm_data.clone());
    });

    let env_vars: Vec<(&str, &str)> = wasm_data
        .env_vars
        .iter()
        .map(|(key, value)| (key.as_str(), value.as_str()))
        .collect();

    let polyfill_memory =
        MEMORY_MANAGER_REF_CELL.with(|manager| manager.borrow().get(MemoryId::new(254)));

    init_with_memory(&[], &env_vars, polyfill_memory);

    let js = get_js_code();

    initialize_js(
        &wasm_data,
        str::from_utf8(&js)?,
        init,
        function_index,
        pass_arg_data,
    )?;

    Ok(())
}

pub fn initialize_js(
    wasm_data: &WasmData,
    js: &str,
    init: bool,
    function_index: i32,
    pass_arg_data: i32,
) -> Result<(), Box<dyn Error>> {
    let runtime = Runtime::new()?;
    let context = Context::full(&runtime)?;

    CONTEXT_REF_CELL.with(|context_ref_cell| {
        *context_ref_cell.borrow_mut() = Some(context);
    });

    quickjs_with_ctx(|ctx| -> Result<(), Box<dyn Error>> {
        let globals = ctx.globals();

        let env = Object::new(ctx.clone())?;

        for (key, value) in env::vars() {
            env.set(key, value)?;
        }

        let process = Object::new(ctx.clone())?;

        process.set("env", env)?;

        globals.set("process", process)?;

        globals.set("_azleNodeWasmEnvironment", false)?;

        globals.set("exports", Object::new(ctx.clone())?)?;

        globals.set("_azleExperimental", false)?;

        globals.set("_azleCanisterMethodNames", Object::new(ctx.clone())?)?;

        globals.set("_azleTimerCallbacks", Object::new(ctx.clone())?)?;

        globals.set("_azleIcTimers", Object::new(ctx.clone())?)?;

        globals.set("_azleRejectCallbacks", Object::new(ctx.clone())?)?;

        globals.set("_azleResolveCallbacks", Object::new(ctx.clone())?)?;

        if init {
            globals.set("_azleInitCalled", true)?;
            globals.set("_azlePostUpgradeCalled", false)?;
        } else {
            globals.set("_azleInitCalled", false)?;
            globals.set("_azlePostUpgradeCalled", true)?;
        }

        let record_benchmarks = WASM_DATA_REF_CELL
            .with(|wasm_data_ref_cell| wasm_data_ref_cell.borrow().clone())
            .as_ref()
            .ok_or("could not convert wasm_data_ref_cell to ref")?
            .record_benchmarks;

        globals.set("_azleRecordBenchmarks", record_benchmarks)?;

        register(ctx.clone())?;

        let promise = Module::evaluate(ctx.clone(), wasm_data.main_js_path.clone(), js)?;

        handle_promise_error(ctx.clone(), promise)?;

        Ok(())
    })?;

    execute_developer_init_or_post_upgrade(function_index, pass_arg_data);

    Ok(())
}

fn execute_developer_init_or_post_upgrade(function_index: i32, pass_arg_data: i32) {
    if function_index != -1 {
        execute_method_js(function_index, pass_arg_data);
    }
}
