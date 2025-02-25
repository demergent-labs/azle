use crate::{RUNTIME, WASM_DATA_REF_CELL, benchmarking::record_benchmark, run_event_loop};
use wasmedge_quickjs::{AsObject, JsValue};

#[unsafe(no_mangle)]
#[allow(unused)]
pub extern "C" fn execute_method_js(function_index: i32) {
    let function_name = function_index.to_string();

    RUNTIME.with(|runtime| {
        let mut runtime = runtime.borrow_mut();
        let runtime = runtime.as_mut().unwrap();

        runtime.run_with_context(|context| {
            let global = context.get_global();

            let exported_canister_class_instance = global.get("_azleExportedCanisterClassInstance");

            let callbacks = if matches!(exported_canister_class_instance, JsValue::UnDefined) {
                global.get("_azleCallbacks")
            } else {
                exported_canister_class_instance
                    .get("_azleCallbacks")
                    .unwrap()
            };

            let method_callback = callbacks.get(&function_name).unwrap();

            let method_callback_function = method_callback.to_function().unwrap();
            let result = method_callback_function.call(&[]);

            match &result {
                wasmedge_quickjs::JsValue::Exception(js_exception) => {
                    js_exception.dump_error();
                    panic!("TODO needs error info");
                }
                _ => run_event_loop(context),
            };

            if WASM_DATA_REF_CELL.with(|wasm_data_ref_cell| {
                wasm_data_ref_cell
                    .borrow()
                    .as_ref()
                    .unwrap()
                    .record_benchmarks
            }) {
                let instructions = ic_cdk::api::performance_counter(1);
                record_benchmark(context, &function_name, instructions);
            }
        });
    });
}
