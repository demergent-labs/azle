use std::cell::RefCell;

use ic_stable_structures::{
    memory_manager::{MemoryManager, VirtualMemory},
    DefaultMemoryImpl,
};

mod azle_error;
mod candid;
mod chunk;
mod execute_method_js;
mod guards;
mod ic;
mod init_and_post_upgrade;
mod quickjs_with_ctx;
mod stable_b_tree_map;
mod wasm_binary_manipulation;

pub use azle_error::AzleError;
pub use quickjs_with_ctx::quickjs_with_ctx;

const MODULE_NAME: &str = "main";

#[allow(unused)]
type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static CONTEXT_REF_CELL: RefCell<Option<rquickjs::Context>> = RefCell::new(None);
    pub static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
}

#[ic_cdk_macros::update]
pub fn _azle_chunk() {}
