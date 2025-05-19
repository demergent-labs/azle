use std::{env::var, error::Error};

use ic_cdk::{api::performance_counter, futures::in_executor_context, trap};
use rquickjs::{Function, Object};

use crate::{
    benchmarking::record_benchmark,
    ic::{drain_inter_canister_call_futures, drain_microtasks},
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
        // Check if _azleCanisterClassMeta is defined
        if let Ok(canister_class_meta) = ctx.clone().globals().get::<_, Object>("_azleCanisterClassMeta") {
            // Check if callbacks property exists
            if let Ok(callbacks) = canister_class_meta.get::<_, Object>("callbacks") {
                // Check if the specific method callback exists
                if let Ok(method_callback) = callbacks.get::<_, Function>(&function_name) {
                    // JavaScript code execution: macrotask
                    call_with_error_handling(&ctx, &method_callback, ())?;
                } else {
                    return Err(format!(
                        "Method callback for '{function_name}' not found in _azleCanisterClassMeta.callbacks"
                    ).into());
                }
            } else {
                return Err("_azleCanisterClassMeta.callbacks is not defined".into());
            }
        } else {
            return Err("globalThis._azleCanisterClassMeta is not defined".into());
        }

        // We must drain all microtasks that could have been queued during the JavaScript macrotask code execution above
        drain_microtasks(&ctx);

        Ok(())
    })?;

    // We must drain all inter-canister call futures that could have been queued during the JavaScript code execution above
    // This MUST be called outside of the with_ctx closure or it will trap
    in_executor_context(|| {
        drain_inter_canister_call_futures();
    });

    if let Ok(azle_record_benchmarks) = var("AZLE_RECORD_BENCHMARKS") {
        if azle_record_benchmarks == "true" {
            let instructions = performance_counter(1);
            record_benchmark(&function_name, instructions)?;
        }
    }

    Ok(())
}
