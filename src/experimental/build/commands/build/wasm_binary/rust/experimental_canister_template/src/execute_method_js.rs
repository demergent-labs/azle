use std::env::var;

use wasmedge_quickjs::{AsObject, JsValue};

use crate::{RUNTIME, benchmarking::record_benchmark, run_event_loop};

#[unsafe(no_mangle)]
#[allow(unused)]
pub extern "C" fn execute_method_js(function_index: i32) {
    let function_name = function_index.to_string();

    RUNTIME.with(|runtime| {
        let mut runtime = runtime.borrow_mut();
        let runtime = runtime.as_mut().unwrap();

        runtime.run_with_context(|context| {
            let global = context.get_global();

            let canister_class_meta = global.get("_azleCanisterClassMeta");

            let callbacks = if matches!(canister_class_meta, JsValue::UnDefined) {
                global.get("_azleCallbacks")
            } else {
                canister_class_meta.get("callbacks").unwrap()
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

            if let Ok(azle_record_benchmarks) = var("AZLE_RECORD_BENCHMARKS") {
                if azle_record_benchmarks == "true" {
                    let instructions = ic_cdk::api::performance_counter(1);
                    record_benchmark(context, &function_name, instructions);
                }
            }
        });
    });
}
