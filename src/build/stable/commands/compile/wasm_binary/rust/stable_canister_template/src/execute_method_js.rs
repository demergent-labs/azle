use std::error::Error;

use ic_cdk::{
    api::{call::arg_data_raw, performance_counter},
    trap,
};
use rquickjs::{Function, Object, TypedArray};

use crate::{
    benchmarking::record_benchmark, error::quickjs_call_with_error_handling, quickjs_with_ctx,
    WASM_DATA_REF_CELL,
};

#[no_mangle]
#[allow(unused)]
pub extern "C" fn execute_method_js(function_index: i32, pass_arg_data_raw: i32) {
    let function_name = function_index.to_string();
    let pass_arg_data = pass_arg_data_raw == 1;

    let result = execute_method_js_with_result(function_name, pass_arg_data);

    if let Err(e) = result {
        trap(&format!("Azle CanisterMethodError: {}", e));
    }
}

fn execute_method_js_with_result(
    function_name: String,
    pass_arg_data: bool,
) -> Result<(), Box<dyn Error>> {
    quickjs_with_ctx(|ctx| {
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

        let candid_args = if pass_arg_data {
            arg_data_raw()
        } else {
            vec![]
        };

        let candid_args_uint8_array = TypedArray::<u8>::new(ctx.clone(), candid_args)?;

        quickjs_call_with_error_handling(ctx.clone(), method_callback, (candid_args_uint8_array,))?;

        Ok(())
    })?;

    let record_benchmarks = WASM_DATA_REF_CELL
        .with(|wasm_data_ref_cell| wasm_data_ref_cell.borrow().clone())
        .as_ref()
        .ok_or("Could not convert wasm_data_ref_cell to ref")?
        .record_benchmarks;

    if record_benchmarks {
        let instructions = performance_counter(1);
        record_benchmark(&function_name, instructions)?;
    }

    Ok(())
}
