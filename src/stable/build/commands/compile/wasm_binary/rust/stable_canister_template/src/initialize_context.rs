use std::{env::vars, error::Error};

use rquickjs::{Array, Context, Module, Object, Runtime, Undefined};

use crate::{
    CONTEXT_REF_CELL,
    ic::register,
    rquickjs_utils::{drain_microtasks, handle_promise_error, with_ctx},
    wasm_binary_manipulation::WasmData,
};

pub fn initialize_context(
    js: Vec<u8>,
    wasm_data: &WasmData,
    icp_replica_wasm_environment: bool,
    node_wasm_environment: bool,
    init: Option<bool>,
) -> Result<(), Box<dyn Error>> {
    let runtime = Runtime::new()?;
    let context = Context::full(&runtime)?;

    CONTEXT_REF_CELL.with(|context_ref_cell| {
        *context_ref_cell.borrow_mut() = Some(context);
    });

    with_ctx(|ctx| -> Result<(), Box<dyn Error>> {
        let globals = ctx.globals();

        globals.set("_azleActions", Array::new(ctx.clone()))?;

        globals.set("_azleCanisterMethodNames", Object::new(ctx.clone())?)?;

        globals.set("_azleExperimental", false)?;

        globals.set("_azleExportedCanisterClassInstance", Undefined)?;

        globals.set("_azleIcExperimental", Undefined)?;

        globals.set(
            "_azleIcpReplicaWasmEnvironment",
            icp_replica_wasm_environment,
        )?;

        // initializes globalThis._azleIcStable
        register(ctx.clone())?;

        globals.set("_azleInitCalled", init == Some(true))?;

        globals.set("_azleNodeWasmEnvironment", node_wasm_environment)?;

        globals.set("_azlePostUpgradeCalled", init == Some(false))?;

        globals.set("exports", Object::new(ctx.clone())?)?;

        // This is here for future compatability only
        // There are currently no environment variables because
        // ic_wasi_polyfill does not work in the Node Wasm environment
        let env = Object::new(ctx.clone())?;

        for (key, value) in vars() {
            env.set(key, value)?;
        }

        let process = Object::new(ctx.clone())?;

        process.set("env", env)?;

        globals.set("process", process)?;

        // JavaScript macrotask
        let promise = Module::evaluate(ctx.clone(), wasm_data.main_js_path.clone(), js)?;

        // We should handle the promise error before run_event_loop
        // as all microtasks queued from the macrotask execution
        // will be discarded if there is a trap
        handle_promise_error(&ctx, promise)?;

        // We consider the Module::evaluate above to be a macrotask,
        // thus we drain all microtasks queued during its execution
        drain_microtasks(&ctx);

        Ok(())
    })
}
