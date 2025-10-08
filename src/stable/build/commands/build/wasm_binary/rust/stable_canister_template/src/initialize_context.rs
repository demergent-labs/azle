use std::{env::vars, error::Error};

use rquickjs::{Array, Context, Module, Object, Runtime, Undefined};

use crate::{
    CONTEXT_REF_CELL,
    ic::{drain_microtasks, register},
    rquickjs_utils::{handle_promise_error, with_ctx},
};

pub enum WasmEnvironment {
    IcpReplica,
    Nodejs,
}

/// Initializes the rquickjs context with the given JavaScript code.
///
/// ## Remarks
///
/// This function creates an rquickjs Runtime and Context, stores the Context globally,
/// then prepares the context and executes the JavaScript code. This functionality is shared
/// across canister_init, canister_post_upgrade, and Candid/MethodMeta generation.
pub fn initialize_context(
    js: Vec<u8>,
    main_js_path: &str,
    wasm_environment: WasmEnvironment,
    init: Option<bool>,
) -> Result<(), Box<dyn Error>> {
    ic_cdk::println!("initialize_context 0");

    let runtime = Runtime::new()?;

    ic_cdk::println!("initialize_context 1");

    let context = Context::full(&runtime)?;

    ic_cdk::println!("initialize_context 2");

    CONTEXT_REF_CELL.with(|context_ref_cell| {
        *context_ref_cell.borrow_mut() = Some(context);
    });

    ic_cdk::println!("initialize_context 3");

    with_ctx(|ctx| {
        ic_cdk::println!("initialize_context 4");

        let globals = ctx.globals();

        ic_cdk::println!("initialize_context 5");

        globals.set("_azleActions", Array::new(ctx.clone()))?;

        ic_cdk::println!("initialize_context 6");

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

        ic_cdk::println!("initialize_context 0");

        // JavaScript code execution: macrotask
        let promise = Module::evaluate(ctx.clone(), main_js_path, js)?;

        ic_cdk::println!("initialize_context 1");

        // We should handle the promise error before drain_microtasks
        // as all JavaScript microtasks queued from the JavaScript macrotask code execution above
        // will be discarded if there is a trap
        handle_promise_error(&ctx, &promise)?;

        ic_cdk::println!("initialize_context 2");

        // We must drain all microtasks that could have been queued during the JavaScript macrotask code execution above
        drain_microtasks(&ctx);

        ic_cdk::println!("initialize_context 3");

        Ok(())
    })

    // Note that we don't call drain_inter_canister_call_futures here because initialize_context is only used
    // with init, post_upgrade, and Candid/MethodMeta generation. None of those allow for inter-canister calls.
}
