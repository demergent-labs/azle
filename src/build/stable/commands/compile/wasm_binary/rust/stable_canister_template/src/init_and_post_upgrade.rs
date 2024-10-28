use ic_stable_structures::memory_manager::MemoryId;

use crate::{
    error::handle_promise_error,
    execute_method_js::execute_method_js,
    ic, quickjs_with_ctx,
    wasm_binary_manipulation::{get_js_code, get_wasm_data},
    CONTEXT_REF_CELL, MEMORY_MANAGER_REF_CELL, MODULE_NAME, WASM_DATA_REF_CELL,
};

#[inline(never)]
#[no_mangle]
pub extern "C" fn init(function_index: i32, pass_arg_data: i32) {
    // Without something like this the init and post_upgrade functions
    // seem to be optimized into the same function in the Wasm binary
    // This causes problems during Wasm binary manipulation
    format!("prevent init and post_upgrade optimization");

    if let Err(e) = initialize(true, function_index, pass_arg_data) {
        ic_cdk::trap(&format!("Azle InitError: {}", e));
    }
}

#[inline(never)]
#[no_mangle]
pub extern "C" fn post_upgrade(function_index: i32, pass_arg_data: i32) {
    if let Err(e) = initialize(false, function_index, pass_arg_data) {
        ic_cdk::trap(&format!("Azle PostUpgradeError: {}", e));
    }
}

fn initialize(
    init: bool,
    function_index: i32,
    pass_arg_data: i32,
) -> Result<(), Box<dyn std::error::Error>> {
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

    ic_wasi_polyfill::init_with_memory(&[], &env_vars, polyfill_memory);

    let js = get_js_code();

    initialize_js(
        std::str::from_utf8(&js)?,
        init,
        function_index,
        pass_arg_data,
    )?;

    Ok(())
}

pub fn initialize_js(
    js: &str,
    init: bool,
    function_index: i32,
    pass_arg_data: i32,
) -> Result<(), Box<dyn std::error::Error>> {
    let runtime = rquickjs::Runtime::new()?;
    let context = rquickjs::Context::full(&runtime)?;

    CONTEXT_REF_CELL.with(|context_ref_cell| {
        *context_ref_cell.borrow_mut() = Some(context);
    });

    quickjs_with_ctx(|ctx| -> Result<(), Box<dyn std::error::Error>> {
        let env = rquickjs::Object::new(ctx.clone())?;

        for (key, value) in std::env::vars() {
            env.set(key, value)?;
        }

        let process = rquickjs::Object::new(ctx.clone())?;

        process.set("env", env)?;

        ctx.clone().globals().set("process", process)?;

        ctx.clone()
            .globals()
            .set("_azleNodeWasmEnvironment", false)?;

        ctx.clone()
            .globals()
            .set("exports", rquickjs::Object::new(ctx.clone())?)?;

        ctx.clone().globals().set("_azleExperimental", false)?;

        if init {
            ctx.clone().globals().set("_azleInitCalled", true)?;
            ctx.clone().globals().set("_azlePostUpgradeCalled", false)?;
        } else {
            ctx.clone().globals().set("_azleInitCalled", false)?;
            ctx.clone().globals().set("_azlePostUpgradeCalled", true)?;
        }

        ic::register(ctx.clone())?;

        let promise = rquickjs::Module::evaluate(ctx.clone(), MODULE_NAME, js)?;

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
