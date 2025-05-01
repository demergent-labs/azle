use std::{env::vars, error::Error};

use rquickjs::{Array, Context, Module, Object, Runtime, Undefined};

use crate::{
    CONTEXT_REF_CELL,
    ic::register,
    rquickjs_utils::{drain_microtasks, handle_promise_error, with_ctx},
};

pub enum WasmEnvironment {
    IcpReplica,
    Nodejs,
}

pub fn initialize_context(
    js: Vec<u8>,
    main_js_path: &str,
    wasm_environment: WasmEnvironment,
    init: Option<bool>,
) -> Result<(), Box<dyn Error>> {
    let runtime = Runtime::new()?;
    let context = Context::full(&runtime)?;

    CONTEXT_REF_CELL.with(|context_ref_cell| {
        *context_ref_cell.borrow_mut() = Some(context);
    });

    with_ctx(|ctx| {
        let globals = ctx.globals();

        globals.set("_azleActions", Array::new(ctx.clone()))?;

        globals.set("_azleCanisterMethodNames", Object::new(ctx.clone())?)?;

        globals.set("_azleExperimental", false)?;

        globals.set("_azleCanisterClassMeta", Undefined)?;

        globals.set("_azleIcExperimental", Undefined)?;

        globals.set(
            "_azleIcpReplicaWasmEnvironment",
            matches!(wasm_environment, WasmEnvironment::IcpReplica),
        )?;

        // initializes globalThis._azleIc
        register(ctx.clone())?;

        globals.set("_azleInitCalled", init == Some(true))?;

        globals.set(
            "_azleNodejsWasmEnvironment",
            matches!(wasm_environment, WasmEnvironment::Nodejs),
        )?;

        globals.set("_azlePostUpgradeCalled", init == Some(false))?;

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

        // JavaScript code execution: macrotask
        let promise = Module::evaluate(ctx.clone(), main_js_path, js)?;

        // We should handle the promise error before drain_microtasks
        // as all JavaScript microtasks queued from the JavaScript code execution above
        // will be discarded if there is a trap
        handle_promise_error(&ctx, &promise)?;

        // We must drain all microtasks that could have been queued during the JavaScript code execution above
        drain_microtasks(&ctx);

        Ok(())
    })
}
