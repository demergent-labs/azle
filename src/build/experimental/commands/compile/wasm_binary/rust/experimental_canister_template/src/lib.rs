// TODO the plan is to integrate rquickjs for stable
// TODO and at that time create two crates
// TODO we should place each crate at src/build/stable/commands/compile/rust
// TODO and src/build/experimental/commands/compile/rust respectively

use std::cell::RefCell;

#[allow(unused)]
use guards::guard_against_non_controllers;
use ic_stable_structures::{
    memory_manager::{MemoryManager, VirtualMemory},
    DefaultMemoryImpl,
};

#[cfg(feature = "experimental")]
mod autoreload;
mod candid;
mod chunk;
mod execute_method_js;
mod guards;
mod ic;
mod init_and_post_upgrade;
mod stable_b_tree_map;
#[cfg(feature = "experimental")]
mod upload_file;
mod wasm_binary_manipulation;
#[cfg(feature = "experimental")]
mod web_assembly;

#[allow(unused)]
type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static RUNTIME: RefCell<Option<wasmedge_quickjs::Runtime>> = RefCell::new(None);
    pub static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
}

const EXPERIMENTAL: bool = cfg!(feature = "experimental");

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

#[cfg(feature = "experimental")]
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

#[cfg(feature = "experimental")]
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

#[cfg(feature = "experimental")]
#[ic_cdk_macros::update(guard = guard_against_non_controllers)]
pub fn _azle_clear_file_and_info(path: String) {
    upload_file::reset_for_new_upload(&path, 0).unwrap()
}

#[cfg(feature = "experimental")]
#[ic_cdk_macros::query(guard = guard_against_non_controllers)]
pub fn _azle_get_file_hash(path: String) -> Option<String> {
    upload_file::get_file_hash(path)
}
