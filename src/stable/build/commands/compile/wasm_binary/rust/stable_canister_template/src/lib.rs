use std::cell::RefCell;

use ic_stable_structures::{
    DefaultMemoryImpl,
    memory_manager::{MemoryManager, VirtualMemory},
};
use rquickjs::Context;

mod benchmarking;
mod candid;
mod execute_method_js;
mod guards;
mod ic;
mod init_and_post_upgrade;
mod initialize_context;
mod internal_canister_methods;
mod rquickjs_utils;
mod stable_b_tree_map;
mod wasm_binary_manipulation;

#[allow(unused)]
type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static CONTEXT_REF_CELL: RefCell<Option<Context>> = RefCell::new(None);
    pub static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
}
