use core::time::Duration;
use std::error::Error;

use candid::Principal;
use ic_cdk::{call::Call, trap};
use ic_cdk_timers::set_timer;
use ic_stable_structures::memory_manager::MemoryId;
use wasmedge_quickjs::AsObject;

use crate::{
    MEMORY_MANAGER_REF_CELL, RUNTIME, WASM_DATA_REF_CELL, execute_method_js, ic,
    ic::{drain_microtasks, rand_seed::rand_seed},
    wasm_binary_manipulation::{WasmData, get_js_code, get_wasm_data},
};

use crate::{upload_file, web_assembly};

#[inline(never)]
#[unsafe(no_mangle)]
pub extern "C" fn init(function_index: i32) {
    // Without something like this the init and post_upgrade functions
    // seem to be optimized into the same function in the Wasm binary
    // This causes problems during Wasm binary manipulation
    let _ = format!("prevent init and post_upgrade optimization");

    initialize(true, function_index);

    upload_file::init_hashes().unwrap();
}

#[inline(never)]
#[unsafe(no_mangle)]
pub extern "C" fn post_upgrade(function_index: i32) {
    initialize(false, function_index);
}

fn initialize(init: bool, function_index: i32) {
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

    std::fs::write("/candid/icp/management.did", &wasm_data.management_did).unwrap();

    let js = get_js_code();

    initialize_js(
        &wasm_data,
        std::str::from_utf8(&js).unwrap(),
        init,
        function_index,
    );

    seed_from_raw_rand();

    ic_cdk::futures::in_executor_context(|| {
        ic_cdk::futures::spawn(async move {
            open_value_sharing::init(&wasm_data.consumer).await;
        });
    });
}

pub fn initialize_js(wasm_data: &WasmData, js: &str, init: bool, function_index: i32) {
    let mut rt = wasmedge_quickjs::Runtime::new();

    rt.run_with_context(|context| {
        ic::register(context);

        web_assembly::register(context);

        let mut env = context.new_object();

        for (key, value) in std::env::vars() {
            env.set(&key, context.new_string(&value).into());
        }

        let mut process = context.new_object();

        process.set("env", env.into());

        context.get_global().set("process", process.into());

        context
            .get_global()
            .set("_azleActions", context.new_array().into());

        context.get_global().set(
            "_azleNodejsWasmEnvironment",
            wasmedge_quickjs::JsValue::Bool(false),
        );

        context
            .get_global()
            .set("_azleCanisterMethodNames", context.new_object().into());

        context.get_global().set(
            "_azleIcpReplicaWasmEnvironment",
            wasmedge_quickjs::JsValue::Bool(true),
        );

        context
            .get_global()
            .set("_azleTimerCallbacks", context.new_object().into());

        context
            .get_global()
            .set("_azleRejectCallbacks", context.new_object().into());

        context
            .get_global()
            .set("_azleResolveCallbacks", context.new_object().into());

        context
            .get_global()
            .set("_azleCallbacks", context.new_object().into());

        // TODO what do we do if there is an error in here?
        context.eval_global_str("globalThis.exports = {};".to_string());
        context.eval_global_str(format!("globalThis._azleExperimental = true;"));

        context.eval_module_str(js.to_string(), &wasm_data.main_js_path);

        drain_microtasks(context);

        // let temp = context.eval_module_str(std::str::from_utf8(MAIN_JS).unwrap().to_string(), "main");

        // match &temp {
        //     wasmedge_quickjs::JsValue::Exception(js_exception) => {
        //         js_exception.dump_error();
        //         panic!("we had an error");
        //     },
        //     _ => {}
        // };

        // ic_cdk::println!("temp: {:#?}", temp);
    });

    RUNTIME.with(|runtime| {
        let mut runtime = runtime.borrow_mut();
        *runtime = Some(rt);
    });

    if function_index != -1 {
        execute_method_js::execute_method_js(function_index);
    }

    // _azleInitCalled and _azlePostUpgradeCalled refer to Azle's own init/post_upgrade methods being called
    // these variables do not indicate if the developer's own init/post_upgrade methods were called
    RUNTIME.with(|runtime| {
        let mut runtime = runtime.borrow_mut();
        let runtime = runtime.as_mut().unwrap();

        runtime.run_with_context(|context| {
            let assignment = if init {
                "globalThis._azleInitCalled = true;\nglobalThis._azlePostUpgradeCalled = false;"
            } else {
                "globalThis._azleInitCalled = false;\nglobalThis._azlePostUpgradeCalled = true;"
            };

            context.eval_global_str(assignment.to_string());
        });
    });
}

fn seed_from_raw_rand() {
    set_timer(Duration::new(0, 0), || {
        ic_cdk::futures::spawn(async {
            let result: Result<(), Box<dyn Error>> = async {
                let randomness: Vec<u8> =
                    Call::unbounded_wait(Principal::management_canister(), "raw_rand")
                        .await?
                        .candid()?;

                rand_seed(
                    randomness
                        .try_into()
                        .map_err(|_| "seed must be exactly 32 bytes in length")?,
                );

                Ok(())
            }
            .await;

            if let Err(e) = result {
                trap(&format!("Azle SeedFromRawRandError: {}", e));
            }
        });
    });
}
