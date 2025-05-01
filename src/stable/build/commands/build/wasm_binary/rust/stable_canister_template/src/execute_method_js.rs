use std::{env::var, error::Error};

use ic_cdk::{api::performance_counter, trap};
use rquickjs::{Function, Object};

use crate::{
    benchmarking::record_benchmark,
    ic::call_raw::drain_inter_canister_call_futures,
    rquickjs_utils::{call_with_error_handling, drain_microtasks, with_ctx},
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

        // JavaScript code execution: macrotask
        call_with_error_handling(&ctx, &method_callback, ())?;

        // We must drain all microtasks that could have been queued during the JavaScript macrotask code execution above
        drain_microtasks(&ctx);

        Ok(())
    })?;

    // This MUST be called outside of the with_ctx closure
    drain_inter_canister_call_futures();

    if let Ok(azle_record_benchmarks) = var("AZLE_RECORD_BENCHMARKS") {
        if azle_record_benchmarks == "true" {
            let instructions = performance_counter(1);
            record_benchmark(&function_name, instructions)?;
        }
    }

    Ok(())
}
