use ic_stable_structures::memory_manager::MemoryId;

use crate::{
    execute_method_js::execute_method_js,
    ic, quickjs_with_ctx,
    wasm_binary_manipulation::{get_js_code, get_wasm_data},
    AzleError, CONTEXT_REF_CELL, MEMORY_MANAGER_REF_CELL, MODULE_NAME,
};

#[inline(never)]
#[no_mangle]
pub extern "C" fn init(function_index: i32, pass_arg_data: i32) {
    // Without something like this the init and post_upgrade functions
    // seem to be optimized into the same function in the Wasm binary
    // This causes problems during Wasm binary manipulation
    format!("prevent init and post_upgrade optimization");

    if let Err(e) = initialize(true, function_index, pass_arg_data) {
        let azle_error = AzleError::Init(e);

        ic_cdk::trap(&azle_error.to_string());
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
    // std::panic::set_hook(Box::new(|panic_info| {
    //     let msg = if let Some(s) = panic_info.payload().downcast_ref::<&str>() {
    //         *s
    //     } else if let Some(s) = panic_info.payload().downcast_ref::<String>() {
    //         s.as_str()
    //     } else {
    //         "Unknown panic message"
    //     };

    //     let location = if let Some(location) = panic_info.location() {
    //         format!(" at {}:{}", location.file(), location.line())
    //     } else {
    //         " (unknown location)".to_string()
    //     };

    //     let message = &format!("Panic occurred: {}{}", msg, location);

    //     ic_cdk::println!("{}", message);

    //     ic_cdk::trap(message);
    // }));

    let wasm_data = get_wasm_data()?;

    let env_vars: Vec<(&str, &str)> = wasm_data
        .env_vars
        .iter()
        .map(|(key, value)| (key.as_str(), value.as_str()))
        .collect();

    let polyfill_memory =
        MEMORY_MANAGER_REF_CELL.with(|manager| manager.borrow().get(MemoryId::new(254)));

    ic_wasi_polyfill::init_with_memory(&[], &env_vars, polyfill_memory);

    let js = get_js_code()?;

    initialize_js(
        std::str::from_utf8(&js)?,
        init,
        function_index,
        pass_arg_data,
    )?;

    Ok(())
}

// TODO do we need all these clonse?
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
        ctx.clone()
            .globals()
            .set("_azleNodeWasmEnvironment", false)?;

        ic::register(ctx.clone())?;

        let env = rquickjs::Object::new(ctx.clone())?;

        for (key, value) in std::env::vars() {
            env.set(key, value)?;
        }

        let process = rquickjs::Object::new(ctx.clone())?;

        process.set("env", env)?;

        ctx.clone().globals().set("process", process)?;

        ctx.clone()
            .globals()
            .set("exports", rquickjs::Object::new(ctx.clone())?)?;

        ctx.clone().globals().set("_azleExperimental", false)?;

        // TODO is there a better name for this main module?
        // TODO this returns a promise...make sure we handle it appropriately
        rquickjs::Module::evaluate(ctx.clone(), MODULE_NAME, js)?;

        Ok(())
    })?;

    // TODO is it possible to just put this all in the same quickjs_with_ctx?
    if function_index != -1 {
        execute_method_js(function_index, pass_arg_data);
    }

    // _azleInitCalled and _azlePostUpgradeCalled refer to Azle's own init/post_upgrade methods being called
    // these variables do not indicate if the developer's own init/post_upgrade methods were called
    quickjs_with_ctx(|ctx| -> Result<(), Box<dyn std::error::Error>> {
        let assignment = if init {
            "globalThis._azleInitCalled = true;"
        } else {
            "globalThis._azlePostUpgradeCalled = true;"
        };

        ctx.eval::<(), _>(assignment)?;
        Ok(())
    })?;

    Ok(())
}
