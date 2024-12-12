use std::cell::RefCell;

#[allow(unused)]
use guards::guard_against_non_controllers;
use ic_stable_structures::{
    memory_manager::{MemoryManager, VirtualMemory},
    DefaultMemoryImpl,
};

mod autoreload;
mod benchmarking;
mod candid;
mod chunk;
mod execute_method_js;
mod guards;
mod ic;
mod init_and_post_upgrade;
mod stable_b_tree_map;
mod upload_file;
mod wasm_binary_manipulation;
mod web_assembly;

#[allow(unused)]
type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static RUNTIME: RefCell<Option<wasmedge_quickjs::Runtime>> = RefCell::new(None);
    pub static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static WASM_DATA_REF_CELL: RefCell<Option<wasm_binary_manipulation::WasmData>> = RefCell::new(None);
}

pub fn run_event_loop(context: &mut wasmedge_quickjs::Context) {
    context.promise_loop_poll();

    loop {
        let num_tasks = context.event_loop().unwrap().run_tick_task();
        context.promise_loop_poll();

        if num_tasks == 0 {
            break;
        }
    }
}

// TODO will this work for queries as well?
#[ic_cdk_macros::update]
pub fn _azle_chunk() {}

#[ic_cdk_macros::update(guard = guard_against_non_controllers)]
fn _azle_reload_js(
    timestamp: u64,
    chunk_number: u64,
    js_bytes: Vec<u8>,
    total_len: u64,
    function_index: i32,
) {
    autoreload::reload_js(timestamp, chunk_number, js_bytes, total_len, function_index);
}

#[ic_cdk_macros::update(guard = guard_against_non_controllers)]
pub async fn _azle_upload_file_chunk(
    dest_path: String,
    timestamp: u64,
    start_index: u64,
    file_bytes: Vec<u8>,
    total_file_len: u64,
) {
    upload_file::upload_file_chunk(
        dest_path,
        timestamp,
        start_index,
        file_bytes,
        total_file_len,
    )
    .await
}

#[ic_cdk_macros::update(guard = guard_against_non_controllers)]
pub fn _azle_clear_file_and_info(path: String) {
    upload_file::reset_for_new_upload(&path, 0).unwrap()
}

#[ic_cdk_macros::query(guard = guard_against_non_controllers)]
pub fn _azle_get_file_hash(path: String) -> Option<String> {
    upload_file::get_file_hash(path)
}

#[ic_cdk_macros::query(guard = guard_against_non_controllers)]
pub fn _azle_get_benchmarks() -> Vec<benchmarking::BenchmarkEntry> {
    benchmarking::BENCHMARKS_REF_CELL
        .with(|benchmarks_ref_cell| benchmarks_ref_cell.borrow().clone())
}
