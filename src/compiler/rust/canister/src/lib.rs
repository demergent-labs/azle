use std::{
    cell::RefCell,
    collections::{BTreeMap, HashMap},
    convert::TryInto,
    env::args,
};

use guards::guard_against_non_controllers;
use ic_stable_structures::{
    memory_manager::{MemoryId, MemoryManager, VirtualMemory},
    storable::Bound,
    DefaultMemoryImpl, StableBTreeMap, Storable,
};
use serde::{Deserialize, Serialize};
use std::fs;
use wasmedge_quickjs::AsObject;

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
#[cfg(feature = "experimental")]
mod web_assembly;

#[cfg(feature = "experimental")]
use open_value_sharing::{Consumer, PeriodicBatch, PERIODIC_BATCHES};

#[allow(unused)]
type Memory = VirtualMemory<DefaultMemoryImpl>;

#[derive(Debug, Serialize, Deserialize)]
struct WasmData {
    env_vars: Vec<(String, String)>,
    #[cfg(feature = "experimental")]
    consumer: Consumer,
    management_did: String,
    experimental: bool,
}

thread_local! {
    static RUNTIME: RefCell<Option<wasmedge_quickjs::Runtime>> = RefCell::new(None);
    pub static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
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

// TODO will this work for queries as well?
#[ic_cdk_macros::update]
pub fn _azle_chunk() {}

// TODO move the wasm functions into their own module
#[inline(never)]
#[no_mangle]
extern "C" fn init_js_passive_data(js_vec_location: i32) -> usize {
    "123_456_789".parse::<usize>().unwrap() + js_vec_location as usize // TODO must be like this for weird optimization reasons
}

// TODO seems we need to do this to stop the compiler from hard-coding the result of this function where it is called
// TODO hopefully there's a less hacky way to do this
#[inline(never)]
#[no_mangle]
extern "C" fn js_passive_data_size() -> usize {
    "123_456_789".parse().unwrap()
}

// TODO waiting on license inspired from https://github.com/adambratschikaye/wasm-inject-data/blob/main/src/static_wasm.rs
#[inline(never)]
#[no_mangle]
pub extern "C" fn get_js_code() -> Vec<u8> {
    let size = unsafe { js_passive_data_size() };
    let mut js_vec = vec![243; size];
    let js_vec_location = js_vec.as_mut_ptr() as i32;

    unsafe {
        init_js_passive_data(js_vec_location);
    }

    js_vec
}

#[inline(never)]
#[no_mangle]
extern "C" fn init_wasm_data_passive_data(wasm_data_vec_location: i32) -> usize {
    "123_456_789".parse::<usize>().unwrap() + wasm_data_vec_location as usize // TODO must be like this for weird optimization reasons
}

// TODO seems we need to do this to stop the compiler from hard-coding the result of this function where it is called
// TODO hopefully there's a less hacky way to do this
#[inline(never)]
#[no_mangle]
extern "C" fn wasm_data_passive_data_size() -> usize {
    "123_456_789".parse().unwrap()
}

// TODO waiting on license inspired from https://github.com/adambratschikaye/wasm-inject-data/blob/main/src/static_wasm.rs
#[inline(never)]
#[no_mangle]
pub extern "C" fn get_wasm_data() -> WasmData {
    let size = unsafe { wasm_data_passive_data_size() };
    let mut wasm_data_vec = vec![243; size];
    let wasm_data_vec_location = wasm_data_vec.as_mut_ptr() as i32;

    unsafe {
        init_wasm_data_passive_data(wasm_data_vec_location);
    }

    serde_json::from_str(std::str::from_utf8(&wasm_data_vec).unwrap()).unwrap()
}

#[cfg(feature = "experimental")]
#[ic_cdk_macros::update(guard = guard_against_non_controllers)]
fn _azle_reload_js(
    timestamp: u64,
    chunk_number: u64,
    js_bytes: Vec<u8>,
    total_len: u64,
    function_index: i32,
    experimental: bool, // TODO we should be able to get rid of this parameter
) {
    autoreload::reload_js(
        timestamp,
        chunk_number,
        js_bytes,
        total_len,
        function_index,
        experimental, // TODO we should be able to get rid of this argument
    );
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
