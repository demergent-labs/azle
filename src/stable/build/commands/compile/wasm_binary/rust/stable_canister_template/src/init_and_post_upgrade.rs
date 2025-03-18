use std::{env::vars, error::Error, str};

use ic_cdk::{spawn, trap};
use ic_stable_structures::memory_manager::MemoryId;
use ic_wasi_polyfill::init_with_memory;
use rquickjs::{Array, AsyncContext, AsyncRuntime, Module, Object, Undefined};

use crate::{
    CONTEXT_REF_CELL, MEMORY_MANAGER_REF_CELL, WASM_DATA_REF_CELL,
    error::handle_promise_error,
    execute_method_js::execute_method_js,
    ic::register,
    quickjs_with_ctx,
    wasm_binary_manipulation::{WasmData, get_js_code, get_wasm_data},
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

    let js = get_js_code()?;

    initialize_js(&wasm_data, str::from_utf8(&js)?, init, function_index)?;

    Ok(())
}

pub fn initialize_js(
    wasm_data: &WasmData,
    js: &str,
    init: bool,
    function_index: i32,
) -> Result<(), Box<dyn Error>> {
    let wasm_data = wasm_data.clone();
    let js = js.to_string();

    spawn(async move {
        let runtime = AsyncRuntime::new().unwrap();
        let context = AsyncContext::full(&runtime).await.unwrap();

        CONTEXT_REF_CELL.with(|context_ref_cell| {
            *context_ref_cell.borrow_mut() = Some(context);
        });

        quickjs_with_ctx(move |ctx| -> Result<(), Box<dyn Error>> {
            let globals = ctx.globals();

            globals.set("_azleActions", Array::new(ctx.clone()))?;

            globals.set("_azleCanisterMethodNames", Object::new(ctx.clone())?)?;

            globals.set("_azleExperimental", false)?;

            globals.set("_azleExportedCanisterClassInstance", Undefined)?;

            globals.set("_azleIcExperimental", Undefined)?;

            globals.set("_azleIcpReplicaWasmEnvironment", true)?;

            // initializes globalThis._azleIcStable
            register(ctx.clone())?;

            if init {
                globals.set("_azleInitCalled", true)?;
            } else {
                globals.set("_azleInitCalled", false)?;
            }

            globals.set("_azleNodeWasmEnvironment", false)?;

            if init {
                globals.set("_azlePostUpgradeCalled", false)?;
            } else {
                globals.set("_azlePostUpgradeCalled", true)?;
            }

            globals.set("_azleRejectCallbacks", Object::new(ctx.clone())?)?;

            globals.set("_azleResolveCallbacks", Object::new(ctx.clone())?)?;

            globals.set("_azleTimerCallbacks", Object::new(ctx.clone())?)?;

            globals.set("exports", Object::new(ctx.clone())?)?;

            let env = Object::new(ctx.clone())?;

            for (key, value) in vars() {
                env.set(key, value)?;
            }

            let process = Object::new(ctx.clone())?;

            process.set("env", env)?;

            globals.set("process", process)?;

            let promise = Module::evaluate(ctx.clone(), wasm_data.main_js_path.clone(), js)?;

            handle_promise_error(ctx.clone(), promise)?;

            Ok(())
        })
        .await
        .unwrap();

        execute_developer_init_or_post_upgrade(function_index);
    });

    Ok(())
}

fn execute_developer_init_or_post_upgrade(function_index: i32) {
    if function_index != -1 {
        execute_method_js(function_index);
    }
}
