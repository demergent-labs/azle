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

mod candid;
mod chunk;
mod execute_method_js;
mod guards;
mod ic;
mod init_and_post_upgrade;
mod stable_b_tree_map;
mod wasm_binary_manipulation;

#[allow(unused)]
type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static CONTEXT: RefCell<Option<rquickjs::Context>> = RefCell::new(None);
    pub static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
}

pub fn run_event_loop(context: rquickjs::Ctx) {
    loop {
        let result = context.execute_pending_job();

        if result == false {
            break;
        }
    }
}

// TODO will this work for queries as well?
#[ic_cdk_macros::update]
pub fn _azle_chunk() {}
