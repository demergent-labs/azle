use std::cell::RefCell;

use ic_stable_structures::{
    DefaultMemoryImpl,
    memory_manager::{MemoryManager, VirtualMemory},
};
use quickjs_with_ctx::quickjs_with_ctx;
use rand::{SeedableRng, rngs::StdRng};
use rquickjs::Context;
use wasm_binary_manipulation::WasmData;

mod benchmarking;
mod candid;
mod error;
mod execute_method_js;
mod guards;
mod ic;
mod init_and_post_upgrade;
mod internal_canister_methods;
mod quickjs_with_ctx;
mod stable_b_tree_map;
mod state;
mod wasm_binary_manipulation;

#[allow(unused)]
type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static CONTEXT_REF_CELL: RefCell<Option<Context>> = RefCell::new(None);
    static CSPRNG: RefCell<StdRng> = RefCell::new(StdRng::from_seed([0;32]));
    static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static WASM_DATA_REF_CELL: RefCell<Option<WasmData>> = RefCell::new(None);
}
