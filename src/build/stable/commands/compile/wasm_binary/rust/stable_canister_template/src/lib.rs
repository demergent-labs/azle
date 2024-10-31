// TODO the plan is to integrate rquickjs for stable
// TODO and at that time create two crates
// TODO we should place each crate at src/build/stable/commands/compile/rust
// TODO and src/build/experimental/commands/compile/rust respectively

use std::cell::RefCell;

// #[allow(unused)]
use ic_stable_structures::{
    memory_manager::{MemoryManager, VirtualMemory},
    DefaultMemoryImpl,
};

mod benchmarking;
mod candid;
mod chunk;
mod execute_method_js;
mod guards;
mod ic;
mod init_and_post_upgrade;
mod quickjs_with_ctx;
mod stable_b_tree_map;
mod wasm_binary_manipulation;

use guards::guard_against_non_controllers;
pub use quickjs_with_ctx::quickjs_with_ctx;

const MODULE_NAME: &str = "main";

#[allow(unused)]
type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static CONTEXT_REF_CELL: RefCell<Option<rquickjs::Context>> = RefCell::new(None);
    pub static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static WASM_DATA_REF_CELL: RefCell<Option<wasm_binary_manipulation::WasmData>> = RefCell::new(None);
}

#[ic_cdk_macros::update]
pub fn _azle_chunk() {}

#[ic_cdk_macros::query(guard = guard_against_non_controllers)]
pub fn _azle_get_benchmarks() -> Vec<benchmarking::BenchmarkEntry> {
    benchmarking::BENCHMARKS_REF_CELL
        .with(|benchmarks_ref_cell| benchmarks_ref_cell.borrow().clone())
}
