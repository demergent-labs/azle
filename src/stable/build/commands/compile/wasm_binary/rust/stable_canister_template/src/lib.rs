use std::{cell::RefCell, error::Error};

use benchmarking::{BENCHMARKS_REF_CELL, BenchmarkEntry};
use guards::guard_against_non_controllers;
use ic_stable_structures::{
    DefaultMemoryImpl,
    memory_manager::{MemoryManager, VirtualMemory},
};
use quickjs_with_ctx::quickjs_with_ctx;
use rquickjs::{Array, Context, Object, Value};
use wasm_binary_manipulation::WasmData;

mod benchmarking;
mod candid;
mod error;
mod execute_method_js;
mod guards;
mod ic;
mod init_and_post_upgrade;
mod quickjs_with_ctx;
mod stable_b_tree_map;
mod state;
mod wasm_binary_manipulation;

#[allow(unused)]
type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static CONTEXT_REF_CELL: RefCell<Option<Context>> = RefCell::new(None);
    pub static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static WASM_DATA_REF_CELL: RefCell<Option<WasmData>> = RefCell::new(None);
}

// TODO should we put all of these in another file?
#[ic_cdk::update]
pub fn _azle_chunk() {}

#[ic_cdk::query(guard = guard_against_non_controllers)]
pub fn _azle_get_benchmarks() -> Vec<BenchmarkEntry> {
    BENCHMARKS_REF_CELL.with(|benchmarks_ref_cell| benchmarks_ref_cell.borrow().clone())
}

#[ic_cdk::query(guard = guard_against_non_controllers)]
pub fn _azle_reject_callbacks_len() -> u32 {
    let result = quickjs_with_ctx(|ctx| -> Result<u32, Box<dyn Error>> {
        let globals = ctx.globals();

        let _azle_reject_callbacks: Object = globals.get("_azleRejectCallbacks")?;

        Ok(_azle_reject_callbacks.keys::<Value>().len() as u32)
    })
    .unwrap();

    result
}

#[ic_cdk::query(guard = guard_against_non_controllers)]
pub fn _azle_resolve_callbacks_len() -> u32 {
    let result = quickjs_with_ctx(|ctx| -> Result<u32, Box<dyn Error>> {
        let globals = ctx.globals();

        let _azle_resolve_callbacks: Object = globals.get("_azleResolveCallbacks")?;

        Ok(_azle_resolve_callbacks.keys::<Value>().len() as u32)
    })
    .unwrap();

    result
}

#[ic_cdk::query(guard = guard_against_non_controllers)]
pub fn _azle_timer_callbacks_len() -> u32 {
    let result = quickjs_with_ctx(|ctx| -> Result<u32, Box<dyn Error>> {
        let globals = ctx.globals();

        let _azle_timer_callbacks: Object = globals.get("_azleTimerCallbacks")?;

        Ok(_azle_timer_callbacks.keys::<Value>().len() as u32)
    })
    .unwrap();

    result
}

#[ic_cdk::query(guard = guard_against_non_controllers)]
pub fn _azle_actions_len() -> u32 {
    let result = quickjs_with_ctx(|ctx| -> Result<u32, Box<dyn Error>> {
        let globals = ctx.globals();

        let _azle_actions: Array = globals.get("_azleActions")?;

        Ok(_azle_actions.len() as u32)
    })
    .unwrap();

    result
}
