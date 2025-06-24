use wasmedge_quickjs::JsValue;

use crate::{
    PEAK_ALLOC, RUNTIME,
    autoreload::reload_js,
    benchmarking::{BENCHMARKS_REF_CELL, BenchmarkEntry},
    guards::guard_against_non_controllers,
    upload_file::{get_file_hash, reset_for_new_upload, upload_file_chunk},
};

#[ic_cdk::update]
pub fn _azle_chunk() {}

#[ic_cdk::update(guard = "guard_against_non_controllers")]
fn _azle_reload_js(
    timestamp: u64,
    chunk_number: u64,
    js_bytes: Vec<u8>,
    total_len: u64,
    function_index: i32,
) {
    reload_js(timestamp, chunk_number, js_bytes, total_len, function_index);
}

#[ic_cdk::update(guard = "guard_against_non_controllers")]
pub async fn _azle_upload_file_chunk(
    dest_path: String,
    timestamp: u64,
    start_index: u64,
    file_bytes: Vec<u8>,
    total_file_len: u64,
) {
    upload_file_chunk(
        dest_path,
        timestamp,
        start_index,
        file_bytes,
        total_file_len,
    )
    .await
}

#[ic_cdk::update(guard = "guard_against_non_controllers")]
pub fn _azle_clear_file_and_info(path: String) {
    reset_for_new_upload(&path, 0).unwrap()
}

#[ic_cdk::query(guard = "guard_against_non_controllers")]
pub fn _azle_get_file_hash(path: String) -> Option<String> {
    get_file_hash(path)
}

#[ic_cdk::query(guard = "guard_against_non_controllers")]
pub fn _azle_get_benchmarks() -> Vec<BenchmarkEntry> {
    BENCHMARKS_REF_CELL.with(|benchmarks_ref_cell| benchmarks_ref_cell.borrow().clone())
}

#[ic_cdk::query(guard = "guard_against_non_controllers")]
fn _azle_reject_callbacks_len() -> i32 {
    RUNTIME.with(|runtime| {
        let mut runtime = runtime.borrow_mut();
        let runtime = runtime.as_mut().unwrap();

        runtime.run_with_context(|context| {
            match context
                .eval_global_str("Object.keys(globalThis._azleRejectCallbacks).length".to_string())
            {
                JsValue::Int(length) => length,
                _ => panic!("Could not convert JsValue to i32"),
            }
        })
    })
}

#[ic_cdk::query(guard = "guard_against_non_controllers")]
fn _azle_resolve_callbacks_len() -> i32 {
    RUNTIME.with(|runtime| {
        let mut runtime = runtime.borrow_mut();
        let runtime = runtime.as_mut().unwrap();

        runtime.run_with_context(|context| {
            match context
                .eval_global_str("Object.keys(globalThis._azleResolveCallbacks).length".to_string())
            {
                JsValue::Int(length) => length,
                _ => panic!("Could not convert JsValue to i32"),
            }
        })
    })
}

#[ic_cdk::query(guard = "guard_against_non_controllers")]
fn _azle_timer_callbacks_len() -> i32 {
    RUNTIME.with(|runtime| {
        let mut runtime = runtime.borrow_mut();
        let runtime = runtime.as_mut().unwrap();

        runtime.run_with_context(|context| {
            match context
                .eval_global_str("Object.keys(globalThis._azleTimerCallbacks).length".to_string())
            {
                JsValue::Int(length) => length,
                _ => panic!("Could not convert JsValue to i32"),
            }
        })
    })
}

#[ic_cdk::query(guard = "guard_against_non_controllers")]
fn _azle_actions_len() -> i32 {
    RUNTIME.with(|runtime| {
        let mut runtime = runtime.borrow_mut();
        let runtime = runtime.as_mut().unwrap();

        runtime.run_with_context(|context| {
            match context.eval_global_str("globalThis._azleActions.length".to_string()) {
                JsValue::Int(length) => length,
                _ => panic!("Could not convert JsValue to i32"),
            }
        })
    })
}

#[ic_cdk::query(guard = "guard_against_non_controllers")]
fn _azle_inter_canister_call_futures_len() -> u32 {
    // Hard-coded to 0 because we don't use the inter-canister call futures queue in experimental mode
    0
}

#[ic_cdk::query(guard = "guard_against_non_controllers")]
fn _azle_is_job_queue_empty() -> bool {
    // Hard-coded to true because wasmedge-quickjs doesn't seem to expose an ideal
    // way to get to the length of the job queue, and we would like to
    // remove wasmedge-quickjs soon after 1.0 is released
    true
}

/// Returns the current size of the heap in bytes to aid in testing for memory leaks and other global state issues.
#[ic_cdk::query(guard = "guard_against_non_controllers")]
fn _azle_heap_allocation() -> u32 {
    PEAK_ALLOC.current_usage() as u32
}
