use std::cell::RefCell;

use ic_stable_structures::{
    DefaultMemoryImpl,
    memory_manager::{MemoryManager, VirtualMemory},
};
use peak_alloc::PeakAlloc;
use rand::{SeedableRng, rngs::StdRng};

mod autoreload;
mod benchmarking;
mod candid;
mod chunk;
mod execute_method_js;
mod guards;
mod ic;
mod init_and_post_upgrade;
mod internal_canister_methods;
mod stable_b_tree_map;
mod upload_file;
mod wasm_binary_manipulation;
mod web_assembly;

#[global_allocator]
static PEAK_ALLOC: PeakAlloc = PeakAlloc;

#[allow(unused)]
type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static CSPRNG: RefCell<StdRng> = RefCell::new(StdRng::from_seed([0;32]));
    static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static RUNTIME: RefCell<Option<wasmedge_quickjs::Runtime>> = RefCell::new(None);
    static WASM_DATA_REF_CELL: RefCell<Option<wasm_binary_manipulation::WasmData>> = RefCell::new(None);
}
