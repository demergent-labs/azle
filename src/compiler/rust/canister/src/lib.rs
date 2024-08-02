use std::{cell::RefCell, collections::BTreeMap, collections::HashMap, convert::TryInto};

use ic_stable_structures::{
    memory_manager::{MemoryId, MemoryManager, VirtualMemory},
    storable::Bound,
    DefaultMemoryImpl, StableBTreeMap, Storable,
};
use open_value_sharing::{Consumer, PeriodicBatch, PERIODIC_BATCHES};
use serde::{Deserialize, Serialize};
use std::fs;
use wasmedge_quickjs::AsObject;

mod ic;
mod web_assembly;

#[allow(unused)]
type Memory = VirtualMemory<DefaultMemoryImpl>;
#[allow(unused)]
type AzleStableBTreeMap = StableBTreeMap<AzleStableBTreeMapKey, AzleStableBTreeMapValue, Memory>;

#[derive(Ord, PartialOrd, Eq, PartialEq, Clone)]
struct AzleStableBTreeMapKey {
    bytes: Vec<u8>,
}

impl Storable for AzleStableBTreeMapKey {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        std::borrow::Cow::Borrowed(&self.bytes)
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        AzleStableBTreeMapKey {
            bytes: bytes.to_vec(),
        }
    }

    const BOUND: Bound = Bound::Unbounded;
}

#[derive(Ord, PartialOrd, Eq, PartialEq, Clone)]
struct AzleStableBTreeMapValue {
    bytes: Vec<u8>,
}

impl Storable for AzleStableBTreeMapValue {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        std::borrow::Cow::Borrowed(&self.bytes)
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        AzleStableBTreeMapValue {
            bytes: bytes.to_vec(),
        }
    }

    const BOUND: Bound = Bound::Unbounded;
}

type Hash = Option<Vec<u8>>;
type Timestamp = u64;
type BytesReceived = u64;
type BytesHashed = u64;

#[derive(Debug, Serialize, Deserialize)]
struct WasmData {
    env_vars: Vec<(String, String)>,
    consumer: Consumer,
    management_did: String,
    experimental: bool,
}

thread_local! {
    static RUNTIME: RefCell<Option<wasmedge_quickjs::Runtime>> = RefCell::new(None);

    static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    static STABLE_B_TREE_MAPS: RefCell<BTreeMap<u8, AzleStableBTreeMap>> = RefCell::new(BTreeMap::new());

    static WASM_INSTANCES: RefCell<HashMap<String, (wasmi::Instance, wasmi::Store<()>)>> = RefCell::new(HashMap::new());

    static RELOADED_JS_TIMESTAMP: RefCell<u64> = RefCell::new(0);

    static RELOADED_JS: RefCell<BTreeMap<u64, Vec<u8>>> = RefCell::new(BTreeMap::new());

    static FILE_INFO: RefCell<BTreeMap<String, (Timestamp, BytesReceived, Hash, BytesHashed)>> = RefCell::new(BTreeMap::new());
}

#[no_mangle]
#[allow(unused)]
pub fn execute_js(function_index: i32, pass_arg_data: i32) {
    let function_name = &function_index.to_string();
    let pass_arg_data = if pass_arg_data == 1 { true } else { false };

    RUNTIME.with(|runtime| {
        let mut runtime = runtime.borrow_mut();
        let runtime = runtime.as_mut().unwrap();

        runtime.run_with_context(|context| {
            let global = context.get_global();
            let exports = global.get("exports");

            let canister_methods = exports.get("canisterMethods").unwrap();

            let callbacks = canister_methods.get("callbacks").unwrap();
            let method_callback = callbacks.get(function_name).unwrap();

            let candid_args = if pass_arg_data {
                ic_cdk::api::call::arg_data_raw()
            } else {
                vec![]
            };

            let candid_args_js_value: wasmedge_quickjs::JsValue =
                context.new_array_buffer(&candid_args).into();

            let method_callback_function = method_callback.to_function().unwrap();

            let result = method_callback_function.call(&[candid_args_js_value]);

            // TODO error handling is mostly done in JS right now
            // TODO we would really like wasmedge-quickjs to add
            // TODO good error info to JsException and move error handling
            // TODO out of our own code
            match &result {
                wasmedge_quickjs::JsValue::Exception(js_exception) => {
                    js_exception.dump_error();
                    panic!("TODO needs error info");
                }
                _ => run_event_loop(context),
            };
        });
    });
}

// Heavily inspired by https://stackoverflow.com/a/47676844
#[no_mangle]
pub fn get_candid_pointer(experimental: i32) -> *mut std::os::raw::c_char {
    std::panic::set_hook(Box::new(|panic_info| {
        let msg = match panic_info.payload().downcast_ref::<&str>() {
            Some(s) => *s,
            None => "Unknown panic message",
        };
        let location = if let Some(location) = panic_info.location() {
            format!(" at {}:{}", location.file(), location.line())
        } else {
            " (unknown location)".to_string()
        };

        let message = &format!("Panic occurred: {}{}", msg, location);

        ic_cdk::println!("{}", message);
    }));

    RUNTIME.with(|runtime| {
        let mut runtime = wasmedge_quickjs::Runtime::new();

        runtime.run_with_context(|context| {
            context.get_global().set(
                "_azleWasmtimeCandidEnvironment",
                wasmedge_quickjs::JsValue::Bool(true),
            );

            ic::register(context);

            let js = get_js_code();

            // TODO what do we do if there is an error in here?
            context.eval_global_str("globalThis.exports = {};".to_string());
            context.eval_global_str(format!(
                "globalThis._azleExperimental = {};",
                if experimental == 1 { "true" } else { "false" }
            ));
            context.eval_module_str(std::str::from_utf8(&js).unwrap().to_string(), "azle_main");

            run_event_loop(context);

            let global = context.get_global();

            let candid_info_function = global.get("candidInfoFunction").to_function().unwrap();

            let candid_info = candid_info_function.call(&[]);

            // TODO error handling is mostly done in JS right now
            // TODO we would really like wasmedge-quickjs to add
            // TODO good error info to JsException and move error handling
            // TODO out of our own code
            match &candid_info {
                wasmedge_quickjs::JsValue::Exception(js_exception) => {
                    js_exception.dump_error();
                    panic!("TODO needs error info");
                }
                _ => run_event_loop(context),
            };

            let candid_info_string = candid_info.to_string().unwrap().to_string();

            let c_string = std::ffi::CString::new(candid_info_string).unwrap();

            c_string.into_raw()
        })
    })
}

fn run_event_loop(context: &mut wasmedge_quickjs::Context) {
    context.promise_loop_poll();

    while (true) {
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

#[no_mangle]
#[allow(unused)]
pub fn init(function_index: i32, pass_arg_data: i32) {
    std::panic::set_hook(Box::new(|panic_info| {
        let msg = if let Some(s) = panic_info.payload().downcast_ref::<&str>() {
            *s
        } else if let Some(s) = panic_info.payload().downcast_ref::<String>() {
            s.as_str()
        } else {
            "Unknown panic message"
        };

        let location = if let Some(location) = panic_info.location() {
            format!(" at {}:{}", location.file(), location.line())
        } else {
            " (unknown location)".to_string()
        };

        let message = &format!("Panic occurred: {}{}", msg, location);

        ic_cdk::println!("{}", message);

        ic_cdk::trap(message);
    }));

    let wasm_data = get_wasm_data();

    let env_vars: Vec<(&str, &str)> = wasm_data
        .env_vars
        .iter()
        .map(|(key, value)| (key.as_str(), value.as_str()))
        .collect();

    let polyfill_memory =
        MEMORY_MANAGER_REF_CELL.with(|manager| manager.borrow().get(MemoryId::new(254)));
    ic_wasi_polyfill::init_with_memory(&[], &env_vars, polyfill_memory);

    std::fs::write("/candid/icp/management.did", &wasm_data.management_did).unwrap();

    let js = get_js_code();

    initialize_js(
        std::str::from_utf8(&js).unwrap(),
        true,
        function_index,
        pass_arg_data,
        wasm_data.experimental,
    );

    ic_cdk::spawn(async move {
        open_value_sharing::init(&wasm_data.consumer).await;
    });
}

#[no_mangle]
#[allow(unused)]
pub fn post_upgrade(function_index: i32, pass_arg_data: i32) {
    std::panic::set_hook(Box::new(|panic_info| {
        let msg = if let Some(s) = panic_info.payload().downcast_ref::<&str>() {
            *s
        } else if let Some(s) = panic_info.payload().downcast_ref::<String>() {
            s.as_str()
        } else {
            "Unknown panic message"
        };

        let location = if let Some(location) = panic_info.location() {
            format!(" at {}:{}", location.file(), location.line())
        } else {
            " (unknown location)".to_string()
        };

        let message = &format!("Panic occurred: {}{}", msg, location);

        ic_cdk::println!("{}", message);

        ic_cdk::trap(message);
    }));

    let wasm_data = get_wasm_data();

    let env_vars: Vec<(&str, &str)> = wasm_data
        .env_vars
        .iter()
        .map(|(key, value)| (key.as_str(), value.as_str()))
        .collect();

    let polyfill_memory =
        MEMORY_MANAGER_REF_CELL.with(|manager| manager.borrow().get(MemoryId::new(254)));
    ic_wasi_polyfill::init_with_memory(&[], &env_vars, polyfill_memory);

    std::fs::write("/candid/icp/management.did", &wasm_data.management_did).unwrap();

    let js = get_js_code();

    initialize_js(
        std::str::from_utf8(&js).unwrap(),
        false,
        function_index,
        pass_arg_data,
        wasm_data.experimental,
    );

    ic_cdk::spawn(async move {
        open_value_sharing::init(&wasm_data.consumer).await;
    });
}

fn initialize_js(
    js: &str,
    init: bool,
    function_index: i32,
    pass_arg_data: i32,
    experimental: bool,
) {
    let mut rt = wasmedge_quickjs::Runtime::new();

    let r = rt.run_with_context(|context| {
        ic::register(context);
        web_assembly::register(context);

        // TODO what do we do if there is an error in here?
        context.eval_global_str("globalThis.exports = {};".to_string());
        context.eval_global_str(format!("globalThis._azleExperimental = {experimental};"));
        context.eval_module_str(js.to_string(), "azle_main");

        run_event_loop(context);

        // let temp = context.eval_module_str(std::str::from_utf8(MAIN_JS).unwrap().to_string(), "azle_main");

        // match &temp {
        //     wasmedge_quickjs::JsValue::Exception(js_exception) => {
        //         js_exception.dump_error();
        //         panic!("we had an error");
        //     },
        //     _ => {}
        // };

        // ic_cdk::println!("temp: {:#?}", temp);
    });

    RUNTIME.with(|runtime| {
        let mut runtime = runtime.borrow_mut();
        *runtime = Some(rt);
    });

    if function_index != -1 {
        execute_js(function_index, pass_arg_data);
    }

    // _azleInitCalled and _azlePostUpgradeCalled refer to Azle's own init/post_upgrade methods being called
    // these variables do not indicate if the developer's own init/post_upgrade methods were called
    RUNTIME.with(|runtime| {
        let mut runtime = runtime.borrow_mut();
        let runtime = runtime.as_mut().unwrap();

        runtime.run_with_context(|context| {
            let assignment = if init {
                "globalThis._azleInitCalled = true;"
            } else {
                "globalThis._azlePostUpgradeCalled = true;"
            };

            context.eval_global_str(assignment.to_string());
        });
    });
}

#[ic_cdk_macros::update(guard = guard_against_non_controllers)]
fn reload_js(
    timestamp: u64,
    chunk_number: u64,
    js_bytes: Vec<u8>,
    total_len: u64,
    function_index: i32,
    experimental: bool,
) {
    RELOADED_JS_TIMESTAMP.with(|reloaded_js_timestamp| {
        let mut reloaded_js_timestamp_mut = reloaded_js_timestamp.borrow_mut();

        if timestamp > *reloaded_js_timestamp_mut {
            *reloaded_js_timestamp_mut = timestamp;

            RELOADED_JS.with(|reloaded_js| {
                let mut reloaded_js_mut = reloaded_js.borrow_mut();
                reloaded_js_mut.clear();
            });
        }
    });

    RELOADED_JS.with(|reloaded_js| {
        let mut reloaded_js_mut = reloaded_js.borrow_mut();
        reloaded_js_mut.insert(chunk_number, js_bytes);

        let reloaded_js_complete_bytes: Vec<u8> =
            reloaded_js_mut.values().flat_map(|v| v.clone()).collect();

        if reloaded_js_complete_bytes.len() as u64 == total_len {
            let js_string = String::from_utf8_lossy(&reloaded_js_complete_bytes);
            initialize_js(&js_string, false, function_index, 1, experimental); // TODO should the last arg be 0?
            ic_cdk::println!("Azle: Reloaded canister JavaScript");
        }
    });
}

#[ic_cdk_macros::update(guard = guard_against_non_controllers)]
pub fn upload_file_chunk(
    dest_path: String,
    timestamp: u64,
    start_index: u64,
    file_bytes: Vec<u8>,
    total_file_len: u64,
) {
    let is_latest_version = check_if_latest_version(&dest_path, timestamp);

    if !is_latest_version {
        return;
    }

    let uploaded_file_len =
        write_chunk(&dest_path, file_bytes, start_index, total_file_len).unwrap();

    let percentage_complete = uploaded_file_len as f64 / total_file_len.max(1) as f64 * 100.0;
    ic_cdk::println!(
        "Received chunk: {} | {}/{} : {:.2}%",
        dest_path,
        bytes_to_human_readable(uploaded_file_len),
        bytes_to_human_readable(total_file_len),
        percentage_complete
    );

    if uploaded_file_len == total_file_len {
        start_hash(dest_path)
    }
}

pub fn guard_against_non_controllers() -> Result<(), String> {
    if ic_cdk::api::is_controller(&ic_cdk::api::caller()) {
        return Ok(());
    }
    return Err(
        "Not Authorized: only controllers of this canister may call this method".to_string(),
    );
}

pub fn start_hash(dest_path: String) {
    let delay = core::time::Duration::new(0, 0);
    let hash_closure = || hash_file(dest_path);
    ic_cdk_timers::set_timer(delay, hash_closure);
}

pub fn bytes_to_human_readable(size_in_bytes: u64) -> String {
    let suffixes = ["B", "KiB", "MiB", "GiB"];
    let size = size_in_bytes as f64;

    let result = suffixes.iter().fold(
        (size, suffixes[0], false),
        |(remaining_size, selected_suffix, done), suffix| {
            if done {
                return (remaining_size, selected_suffix, done);
            }
            if remaining_size < 1024.0 {
                (remaining_size, suffix, true)
            } else {
                (remaining_size / 1024.0, suffix, false)
            }
        },
    );

    format!("{:.2} {}", result.0, result.1)
}

// Adds the given file_bytes to the chunked file at the chunk number position.
// Returns the new total length of chunked file after the addition
pub fn write_chunk(
    path: &str,
    file_bytes: Vec<u8>,
    start_index: u64,
    file_len: u64,
) -> std::io::Result<u64> {
    match std::path::Path::new(path).parent() {
        Some(dir_path) => std::fs::create_dir_all(dir_path)?,
        None => (), //Dir doesn't need to be created
    };

    let mut file: std::fs::File = match std::fs::OpenOptions::new().write(true).open(path) {
        Ok(file) => file,
        Err(_) => init_file(path, file_len)?,
    };

    std::io::Seek::seek(&mut file, std::io::SeekFrom::Start(start_index))?;
    std::io::Write::write_all(&mut file, &file_bytes)?;
    drop(file);

    Ok(set_bytes_received(path, file_bytes.len()))
}

fn init_file(path: &str, file_len: u64) -> std::io::Result<std::fs::File> {
    let new_file = std::fs::OpenOptions::new()
        .create(true)
        .write(true)
        .truncate(true)
        .open(&path)?;
    new_file.set_len(file_len)?;
    Ok(new_file)
}

fn set_bytes_received(dest_path: &str, bytes_in_chunk: usize) -> u64 {
    FILE_INFO.with(|total_bytes_received| {
        let mut total_bytes_received_mut = total_bytes_received.borrow_mut();
        match total_bytes_received_mut.get_mut(dest_path) {
            Some((_, total_bytes, _, _)) => {
                *total_bytes += bytes_in_chunk as u64;
                *total_bytes
            }
            None => panic!("Couldn't find file info for {}", dest_path),
        }
    })
}

pub fn check_if_latest_version(dest_path: &str, current_timestamp: Timestamp) -> bool {
    let last_recorded_timestamp = get_timestamp(dest_path);

    if current_timestamp < last_recorded_timestamp {
        // The request is from an earlier upload attempt. Disregard
        return false;
    }

    if current_timestamp > last_recorded_timestamp {
        // The request is from a newer upload attempt. Clean up the previous attempt.
        reset_for_new_upload(dest_path, current_timestamp).unwrap();
    }

    true
}

fn get_timestamp(path: &str) -> Timestamp {
    FILE_INFO.with(|uploaded_file_timestamps_map| {
        match uploaded_file_timestamps_map.borrow().get(path) {
            Some((timestamp, _, _, _)) => timestamp.clone(),
            None => 0,
        }
    })
}

#[ic_cdk_macros::update(guard = guard_against_non_controllers)]
pub fn clear_file_and_info(path: String) {
    reset_for_new_upload(&path, 0).unwrap()
}

fn reset_for_new_upload(path: &str, timestamp: Timestamp) -> std::io::Result<()> {
    delete_if_exists(path)?;
    initialize_file_info(path, timestamp);
    Ok(())
}

fn initialize_file_info(path: &str, timestamp: Timestamp) {
    FILE_INFO.with(|file_info| {
        let mut file_info_mut = file_info.borrow_mut();

        file_info_mut.insert(path.to_string(), (timestamp, 0, None, 0));
    });
}

fn delete_if_exists(path: &str) -> std::io::Result<()> {
    if std::fs::metadata(path).is_ok() {
        std::fs::remove_file(path)?;
    }
    Ok(())
}

pub fn hash_file(path: String) {
    clear_file_hash(&path);
    hash_file_by_parts(&path, 0)
}

#[ic_cdk_macros::query(guard = guard_against_non_controllers)]
pub fn get_file_hash(path: String) -> Option<String> {
    Some(
        load_hashes()
            .unwrap()
            .get(&path)?
            .iter()
            .map(|bytes| format!("{:02x}", bytes))
            .collect(),
    )
}

#[ic_cdk_macros::query(guard = guard_against_non_controllers)]
pub fn get_hash_status(path: String) -> Option<(u64, u64)> {
    Some((get_bytes_hashed(&path), get_file_size(&path)?))
}

fn hash_file_by_parts(path: &str, position: u64) {
    let file_length = std::fs::metadata(path).unwrap().len();
    let percentage = position / file_length.max(1) * 100;
    ic_cdk::println!(
        "Hashing: {} | {}/{} : {:.2}%",
        path,
        bytes_to_human_readable(position),
        bytes_to_human_readable(file_length),
        percentage
    );
    let mut file = std::fs::File::open(&path).unwrap();

    std::io::Seek::seek(&mut file, std::io::SeekFrom::Start(position)).unwrap();

    // Read the bytes
    let limit = 75 * 1024 * 1024; // This limit will be determine by how much hashing an update method can do without running out of cycles. It runs out somewhere between 75 and 80
                                  // This limit must be the same as on the node side or else the hashes will not match
    let mut buffer = vec![0; limit];
    let bytes_read = std::io::Read::read(&mut file, &mut buffer).unwrap();

    let previous_hash = get_partial_file_hash(path);

    if bytes_read != 0 {
        let new_hash = hash_chunk_with(&buffer, previous_hash.as_ref());
        set_partial_hash(path, new_hash);
        set_bytes_hashed(path, position + bytes_read as u64);
        spawn_hash_by_parts(path.to_string(), position + bytes_read as u64)
    } else {
        // No more bytes to hash, set as final hash for this file
        let final_hash = match previous_hash {
            Some(hash) => hash,
            None => {
                let empty_file_hash = hash_chunk_with(&[], None);
                empty_file_hash
            }
        };
        set_file_hash(path, final_hash);
        clear_file_info(path);
    }
}

fn spawn_hash_by_parts(path: String, position: u64) {
    let delay = core::time::Duration::new(0, 0);
    let closure = move || hash_file_by_parts(&path, position);
    ic_cdk_timers::set_timer(delay, closure);
}

pub fn get_partial_file_hash(path: &str) -> Option<Vec<u8>> {
    FILE_INFO
        .with(|file_info| Some(file_info.borrow().get(path)?.2.clone()))
        .flatten()
}

fn set_partial_hash(path: &str, hash: Vec<u8>) {
    FILE_INFO.with(|file_hashes| {
        if let Some(entry) = file_hashes.borrow_mut().get_mut(path) {
            entry.2 = Some(hash);
        } else {
            panic!("Couldn't find file info for {}", path)
        }
    });
}

fn clear_file_info(path: &str) {
    FILE_INFO.with(|file_info| file_info.borrow_mut().remove(path));
}

fn clear_file_hash(path: &str) {
    let mut file_hashes = load_hashes().unwrap();
    file_hashes.remove(path);
    save_hashes(&file_hashes).unwrap();
}

fn set_file_hash(path: &str, hash: Vec<u8>) {
    let mut file_hashes = load_hashes().unwrap();
    file_hashes.insert(path.to_string(), hash);
    save_hashes(&file_hashes).unwrap();
}

fn get_bytes_hashed(path: &str) -> u64 {
    FILE_INFO.with(|file_info| {
        let file_info = file_info.borrow();
        match file_info.get(path) {
            Some(file_info) => file_info.clone().3,
            None => get_file_size(path).unwrap(),
        }
    })
}

fn set_bytes_hashed(path: &str, bytes_hashed: u64) {
    FILE_INFO.with(|file_info| {
        let mut file_info_mut = file_info.borrow_mut();
        if let Some(file_info_entry) = file_info_mut.get_mut(path) {
            file_info_entry.3 = bytes_hashed;
        }
    });
}

fn get_file_size(path: &str) -> Option<u64> {
    match std::fs::metadata(path) {
        Ok(metadata) => Some(metadata.len()),
        Err(_) => None,
    }
}

pub fn get_file_hash_path() -> std::path::PathBuf {
    std::path::Path::new(".config")
        .join("azle")
        .join("file_hashes.json")
}

fn hash_chunk_with(data: &[u8], previous_hash: Option<&Vec<u8>>) -> Vec<u8> {
    let mut h: sha2::Sha256 = sha2::Digest::new();
    sha2::Digest::update(&mut h, data);
    if let Some(hash) = previous_hash {
        sha2::Digest::update(&mut h, hash);
    }
    sha2::Digest::finalize(h).to_vec()
}

fn load_hashes() -> Result<HashMap<String, Vec<u8>>, std::io::Error> {
    let file_hash_path = get_file_hash_path();
    if !file_hash_path.exists() {
        // If File doesn't exist yet return empty hash map
        return Ok(HashMap::new());
    }
    let buffer = std::fs::read(file_hash_path)?;

    Ok(if buffer.is_empty() {
        // If File is empty return empty hash map
        HashMap::new()
    } else {
        serde_json::from_slice(&buffer)?
    })
}

fn save_hashes(file_hashes: &HashMap<String, Vec<u8>>) -> Result<(), std::io::Error> {
    let data = serde_json::to_vec(file_hashes)?;

    std::fs::write(get_file_hash_path(), data)
}
