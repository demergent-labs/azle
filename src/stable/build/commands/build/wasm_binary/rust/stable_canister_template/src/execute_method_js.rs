use std::{env::var, error::Error};

use ic_cdk::{api::performance_counter, spawn, trap};
use rquickjs::{Function, Object};

use crate::{
    INTER_CANISTER_CALL_QUEUE,
    benchmarking::record_benchmark,
    rquickjs_utils::{call_with_error_handling, with_ctx},
};

#[unsafe(no_mangle)]
#[allow(unused)]
pub extern "C" fn execute_method_js(function_index: i32) {
    let function_name = function_index.to_string();

    let result = execute_method_js_with_result(function_name);

    if let Err(e) = result {
        trap(&format!("Azle CanisterMethodError: {}", e));
    }
}

fn execute_method_js_with_result(function_name: String) -> Result<(), Box<dyn Error>> {
    with_ctx(|ctx| {
        let canister_class_meta: Object = ctx
            .clone()
            .globals()
            .get("_azleCanisterClassMeta")
            .map_err(|e| format!("Failed to get globalThis._azleCanisterClassMeta: {e}"))?;

        let callbacks: Object = canister_class_meta.get("callbacks").map_err(|e| {
            format!("Failed to get globalThis._azleCanisterClassMeta.callbacks: {e}")
        })?;

        let method_callback: Function = callbacks.get(&function_name).map_err(|e| {
            format!(
                "Failed to get globalThis._azleCanisterClassMeta.callbacks[{function_name}]: {e}"
            )
        })?;

        call_with_error_handling(&ctx, &method_callback, ())?;

        Ok(())
    })?;

    // INTER_CANISTER_CALL_QUEUE.with(|queue| {
    //     let mut queued = std::mem::take(&mut *queue.borrow_mut());

    //     ic_cdk::println!("queued length: {}", queued.len());

    //     for fut in queued.drain(..) {
    //         ic_cdk::println!("about to run spawn");

    //         spawn(fut);

    //         ic_cdk::println!("spawn executed");
    //     }
    // });

    // TODO is the outer loop necessary?
    // TODO make this as simple as possible
    // TODO I think that we only need one
    // TODO at the end of every call here in execute_method_js
    // TODO and after every inter-canister callback
    // TODO make sure to add a length check to our tests
    // TODO for the global queue
    loop {
        let batch: Vec<_> = INTER_CANISTER_CALL_QUEUE.with(|q| q.borrow_mut().drain(..).collect());

        if batch.is_empty() {
            break;
        }

        for fut in batch {
            spawn(fut);
        }
    }

    if let Ok(azle_record_benchmarks) = var("AZLE_RECORD_BENCHMARKS") {
        if azle_record_benchmarks == "true" {
            let instructions = performance_counter(1);
            record_benchmark(&function_name, instructions)?;
        }
    }

    Ok(())
}
