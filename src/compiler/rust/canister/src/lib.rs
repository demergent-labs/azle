use std::{cell::RefCell, collections::BTreeMap, collections::HashMap, convert::TryInto};

#[allow(unused)]
use canister_methods::canister_methods;
use ic_stable_structures::{
    memory_manager::{MemoryId, MemoryManager, VirtualMemory},
    storable::Bound,
    DefaultMemoryImpl, StableBTreeMap, Storable,
};
use include_dir::{include_dir, Dir};
use open_value_sharing::{Consumer, PeriodicBatch, PERIODIC_BATCHES};
use serde::{Deserialize, Serialize};
use std::fs;
use wasmedge_quickjs::AsObject;

mod ic;
mod web_assembly;

#[cfg(all(target_arch = "wasm32", target_os = "wasi"))]
const MAIN_JS: &[u8] = include_bytes!("main.js");

#[cfg(all(target_arch = "wasm32", target_os = "wasi"))]
const CANDID: &[u8] = include_bytes!("candid.did");

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

#[cfg(all(target_arch = "wasm32", target_os = "wasi"))]
canister_methods!();

#[no_mangle]
#[allow(unused)]
pub fn execute_js(function_index: i32, pass_arg_data: i32) {
    ic_cdk::println!("execute_js function_index: {}", function_index);
    ic_cdk::println!("execute_js pass_arg_data: {}", pass_arg_data);

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
pub fn get_candid_pointer() -> *mut std::os::raw::c_char {
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
extern "C" fn init_wasm_data_passive_data(js_vec_location: i32) -> usize {
    "123_456_789".parse::<usize>().unwrap() + js_vec_location as usize // TODO must be like this for weird optimization reasons
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
