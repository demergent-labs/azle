use std::cell::RefCell;

use ic_stable_structures::{
    memory_manager::{MemoryManager, VirtualMemory},
    DefaultMemoryImpl,
};

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

pub use quickjs_with_ctx::quickjs_with_ctx;

// TODO dynamically get the canister name
// TODO send it in through the Wasm meta data
const MODULE_NAME: &str = ".azle/[canister_name]/main.js";

#[allow(unused)]
type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static CONTEXT_REF_CELL: RefCell<Option<rquickjs::Context>> = RefCell::new(None);
    pub static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
}

#[ic_cdk_macros::update]
pub fn _azle_chunk() {}
