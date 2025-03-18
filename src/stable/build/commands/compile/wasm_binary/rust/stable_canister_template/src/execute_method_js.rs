use std::{env::var, error::Error};

use ic_cdk::{api::performance_counter, spawn, trap};
use rquickjs::{Function, Object};

use crate::{
    benchmarking::record_benchmark, error::quickjs_call_with_error_handling, quickjs_with_ctx,
};

#[unsafe(no_mangle)]
#[allow(unused)]
pub extern "C" fn execute_method_js(function_index: i32) {
    ic_cdk::println!("function_index: {}", function_index);

    spawn(async move {
        let function_name = function_index.to_string();

        ic_cdk::println!("function_name: {}", function_name);

        let result = execute_method_js_with_result(function_name).await;

        ic_cdk::println!("result: {:?}", result);

        if let Err(e) = result {
            trap(&format!("Azle CanisterMethodError: {}", e));
        }
    });
}

async fn execute_method_js_with_result(function_name: String) -> Result<(), Box<dyn Error>> {
    let function_name_cloned = function_name.clone();

    quickjs_with_ctx(move |ctx| {
        let exported_canister_class_instance: Object = ctx
            .clone()
            .globals()
            .get("_azleExportedCanisterClassInstance")
            .map_err(|e| {
                format!("Failed to get globalThis._azleExportedCanisterClassInstance: {e}")
            })?;

        let callbacks: Object = exported_canister_class_instance
            .get("_azleCallbacks")
            .map_err(|e| {
                format!("Failed to get exportedCanisterClassInstance._azleCallbacks: {e}")
            })?;

        let method_callback: Function = callbacks.get(&function_name).map_err(|e| {
            format!(
                "Failed to get exportedCanisterClassInstance._azleCallbacks[{function_name}]: {e}"
            )
        })?;

        quickjs_call_with_error_handling(ctx.clone(), method_callback, ())?;

        Ok(())
    })
    .await?;

    if let Ok(azle_record_benchmarks) = var("AZLE_RECORD_BENCHMARKS") {
        if azle_record_benchmarks == "true" {
            let instructions = performance_counter(1);
            record_benchmark(&function_name_cloned, instructions).await?;
        }
    }

    Ok(())
}
