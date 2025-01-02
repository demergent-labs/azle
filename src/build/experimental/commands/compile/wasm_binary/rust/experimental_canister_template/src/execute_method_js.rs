use crate::{benchmarking::record_benchmark, run_event_loop, RUNTIME, WASM_DATA_REF_CELL};
use wasmedge_quickjs::{AsObject, JsValue};

#[no_mangle]
#[allow(unused)]
pub extern "C" fn execute_method_js(function_index: i32, pass_arg_data: i32) {
    let function_name = function_index.to_string();
    let pass_arg_data = pass_arg_data == 1;

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

            let candid_args = if pass_arg_data {
                ic_cdk::api::call::arg_data_raw()
            } else {
                vec![]
            };

            let candid_args_js_value: wasmedge_quickjs::JsValue =
                context.new_array_buffer(&candid_args).into();

            let method_callback_function = method_callback.to_function().unwrap();
            let result = method_callback_function.call(&[candid_args_js_value]);

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
