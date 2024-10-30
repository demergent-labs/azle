use crate::{benchmarking::record_benchmark, quickjs_with_ctx, WASM_DATA_REF_CELL};

#[no_mangle]
#[allow(unused)]
pub extern "C" fn execute_method_js(function_index: i32, pass_arg_data: i32) {
    let function_name = &function_index.to_string();
    let pass_arg_data = if pass_arg_data == 1 { true } else { false };

    quickjs_with_ctx(|ctx| {
        let callbacks: rquickjs::Object = ctx.clone().globals().get("_azleCallbacks").unwrap();

        let method_callback: rquickjs::Function = callbacks.get(function_name).unwrap();

        let candid_args = if pass_arg_data {
            ic_cdk::api::call::arg_data_raw()
        } else {
            vec![]
        };

        method_callback
            .call::<_, rquickjs::Undefined>((candid_args,))
            .unwrap();
    });

    if WASM_DATA_REF_CELL.with(|wasm_data_ref_cell| {
        wasm_data_ref_cell
            .borrow()
            .as_ref()
            .unwrap()
            .record_benchmarks
    }) {
        let instructions = ic_cdk::api::performance_counter(1);
        record_benchmark(&function_name, instructions);
    }
}
