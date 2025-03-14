use std::cell::RefCell;

use ic_stable_structures::{
    DefaultMemoryImpl,
    memory_manager::{MemoryManager, VirtualMemory},
};

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

#[allow(unused)]
type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static RUNTIME: RefCell<Option<wasmedge_quickjs::Runtime>> = RefCell::new(None);
    pub static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static WASM_DATA_REF_CELL: RefCell<Option<wasm_binary_manipulation::WasmData>> = RefCell::new(None);
}

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
