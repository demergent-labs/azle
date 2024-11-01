use std::cell::RefCell;

use benchmarking::{BenchmarkEntry, BENCHMARKS_REF_CELL};
use guards::guard_against_non_controllers;
use ic_stable_structures::{
    memory_manager::{MemoryManager, VirtualMemory},
    DefaultMemoryImpl,
};
use quickjs_with_ctx::quickjs_with_ctx;
use rquickjs::Context;
use wasm_binary_manipulation::WasmData;

mod benchmarking;
mod candid;
mod chunk;
mod error;
mod execute_method_js;
mod guards;
mod ic;
mod init_and_post_upgrade;
mod quickjs_with_ctx;
mod stable_b_tree_map;
mod wasm_binary_manipulation;

#[allow(unused)]
type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static CONTEXT_REF_CELL: RefCell<Option<Context>> = RefCell::new(None);
    pub static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static WASM_DATA_REF_CELL: RefCell<Option<WasmData>> = RefCell::new(None);
}

#[ic_cdk_macros::update]
pub fn _azle_chunk() {}

#[ic_cdk_macros::query(guard = guard_against_non_controllers)]
pub fn _azle_get_benchmarks() -> Vec<BenchmarkEntry> {
    BENCHMARKS_REF_CELL.with(|benchmarks_ref_cell| benchmarks_ref_cell.borrow().clone())
}
