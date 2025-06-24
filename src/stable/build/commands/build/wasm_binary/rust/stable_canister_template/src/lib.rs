use std::cell::RefCell;
use std::future::Future;
use std::pin::Pin;

use ic_stable_structures::{
    DefaultMemoryImpl,
    memory_manager::{MemoryManager, VirtualMemory},
};
use peak_alloc::PeakAlloc;
use rand::{SeedableRng, rngs::StdRng};
use rquickjs::Context;

mod benchmarking;
mod candid_and_method_meta;
mod execute_method_js;
mod guards;
mod ic;
mod init_and_post_upgrade;
mod initialize_context;
mod internal_canister_methods;
mod rquickjs_utils;
mod stable_b_tree_map;
mod state;
mod wasm_binary_manipulation;

#[global_allocator]
static PEAK_ALLOC: PeakAlloc = PeakAlloc;

#[allow(unused)]
type Memory = VirtualMemory<DefaultMemoryImpl>;

type InterCanisterCallFuture = Pin<Box<dyn Future<Output = ()> + 'static>>;

thread_local! {
    static CONTEXT_REF_CELL: RefCell<Option<Context>> = RefCell::new(None);
    static CSPRNG: RefCell<StdRng> = RefCell::new(StdRng::from_seed([0;32]));
    static INTER_CANISTER_CALL_FUTURES: RefCell<Vec<InterCanisterCallFuture>> = RefCell::new(Vec::new());
    static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
}
