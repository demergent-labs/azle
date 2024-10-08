use ic_stable_structures::memory_manager::MemoryId;

use crate::{
    execute_method_js::execute_method_js,
    ic, quickjs_with_ctx, run_event_loop,
    wasm_binary_manipulation::{get_js_code, get_wasm_data},
    CONTEXT_REF_CELL, MEMORY_MANAGER_REF_CELL, MODULE_NAME,
};

#[inline(never)]
#[no_mangle]
pub extern "C" fn init(function_index: i32, pass_arg_data: i32) {
    // Without something like this the init and post_upgrade functions
    // seem to be optimized into the same function in the Wasm binary
    // This causes problems during Wasm binary manipulation
    format!("prevent init and post_upgrade optimization");

    initialize(true, function_index, pass_arg_data);
}

#[inline(never)]
#[no_mangle]
pub extern "C" fn post_upgrade(function_index: i32, pass_arg_data: i32) {
    initialize(false, function_index, pass_arg_data);
}

fn initialize(init: bool, function_index: i32, pass_arg_data: i32) {
    std::panic::set_hook(Box::new(|panic_info| {
        let msg = if let Some(s) = panic_info.payload().downcast_ref::<&str>() {
            *s
        } else if let Some(s) = panic_info.payload().downcast_ref::<String>() {
            s.as_str()
        } else {
            "Unknown panic message"
        };

        let location = if let Some(location) = panic_info.location() {
            format!(" at {}:{}", location.file(), location.line())
        } else {
            " (unknown location)".to_string()
        };

        let message = &format!("Panic occurred: {}{}", msg, location);

        ic_cdk::println!("{}", message);

        ic_cdk::trap(message);
    }));

    let wasm_data = get_wasm_data();

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
        std::str::from_utf8(&js).unwrap(),
        init,
        function_index,
        pass_arg_data,
    );
}

// TODO do we need all these clonse?
// TODO do not forget to deal with the event loop everywhere
pub fn initialize_js(js: &str, init: bool, function_index: i32, pass_arg_data: i32) {
    let runtime = rquickjs::Runtime::new().unwrap();
    let context = rquickjs::Context::full(&runtime).unwrap();

    CONTEXT_REF_CELL.with(|context_ref_cell| {
        *context_ref_cell.borrow_mut() = Some(context);
    });

    quickjs_with_ctx(|ctx| {
        ic::register(ctx.clone());

        let env = rquickjs::Object::new(ctx.clone()).unwrap();

        for (key, value) in std::env::vars() {
            env.set(key, value).unwrap();
        }

        ctx.clone()
            .globals()
            .set("_azleNodeWasmEnvironment", false)
            .unwrap();

        let process = rquickjs::Object::new(ctx.clone()).unwrap();

        process.set("env", env).unwrap();

        ctx.clone().globals().set("process", process).unwrap();

        ctx.clone()
            .globals()
            .set("_azleNodeWasmEnvironment", false)
            .unwrap();

        ctx.clone()
            .globals()
            .set("exports", rquickjs::Object::new(ctx.clone()).unwrap())
            .unwrap();

        ctx.clone()
            .globals()
            .set("_azleExperimental", false)
            .unwrap();

        // TODO is there a better name for this main module?
        // TODO this returns a promise...make sure we handle it appropriately
        rquickjs::Module::evaluate(ctx.clone(), MODULE_NAME, js).unwrap();

        run_event_loop(ctx.clone());
    });

    if function_index != -1 {
        execute_method_js(function_index, pass_arg_data);
    }

    // _azleInitCalled and _azlePostUpgradeCalled refer to Azle's own init/post_upgrade methods being called
    // these variables do not indicate if the developer's own init/post_upgrade methods were called
    quickjs_with_ctx(|ctx| {
        let assignment = if init {
            "globalThis._azleInitCalled = true;"
        } else {
            "globalThis._azlePostUpgradeCalled = true;"
        };

        ctx.eval::<(), _>(assignment).unwrap();
    });
}
