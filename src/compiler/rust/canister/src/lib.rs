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

mod chunk;
mod guards;
mod ic;
#[cfg(feature = "experimental")]
mod upload_file;
#[cfg(feature = "experimental")]
mod web_assembly;

#[cfg(feature = "experimental")]
use open_value_sharing::{Consumer, PeriodicBatch, PERIODIC_BATCHES};
#[cfg(feature = "experimental")]
use upload_file::Timestamp;

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

    static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    static STABLE_B_TREE_MAPS: RefCell<BTreeMap<u8, AzleStableBTreeMap>> = RefCell::new(BTreeMap::new());

    #[cfg(feature = "experimental")]
    static RELOADED_JS_TIMESTAMP: RefCell<u64> = RefCell::new(0);

    #[cfg(feature = "experimental")]
    static RELOADED_JS: RefCell<BTreeMap<u64, Vec<u8>>> = RefCell::new(BTreeMap::new());
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

    #[cfg(feature = "experimental")]
    std::fs::write("/candid/icp/management.did", &wasm_data.management_did).unwrap();

    let js = get_js_code();

    initialize_js(
        std::str::from_utf8(&js).unwrap(),
        true,
        function_index,
        pass_arg_data,
        wasm_data.experimental,
    );

    #[cfg(feature = "experimental")]
    ic_cdk::spawn(async move {
        open_value_sharing::init(&wasm_data.consumer).await;
    });

    #[cfg(feature = "experimental")]
    upload_file::init_hashes().unwrap();
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

    #[cfg(feature = "experimental")]
    std::fs::write("/candid/icp/management.did", &wasm_data.management_did).unwrap();

    let js = get_js_code();

    initialize_js(
        std::str::from_utf8(&js).unwrap(),
        false,
        function_index,
        pass_arg_data,
        wasm_data.experimental,
    );

    #[cfg(feature = "experimental")]
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

        #[cfg(feature = "experimental")]
        web_assembly::register(context);

        let mut env = context.new_object();

        for (key, value) in std::env::vars() {
            env.set(&key, context.new_string(&value).into());
        }

        let mut process = context.new_object();

        process.set("env", env.into());

        context.get_global().set("process", process.into());

        context.get_global().set(
            "_azleWasmtimeCandidEnvironment",
            wasmedge_quickjs::JsValue::Bool(false),
        );

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

#[cfg(feature = "experimental")]
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
