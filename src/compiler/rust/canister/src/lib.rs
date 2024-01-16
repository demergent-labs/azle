#[allow(unused)]
use canister_methods::canister_methods;
use ic_stable_structures::{
    memory_manager::{MemoryManager, VirtualMemory},
    storable::Bound,
    DefaultMemoryImpl, StableBTreeMap, Storable,
};
use std::collections::BTreeMap;
use std::{cell::RefCell, convert::TryInto};
use wasmedge_quickjs::AsObject;

mod ic;

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

thread_local! {
    static RUNTIME: RefCell<Option<wasmedge_quickjs::Runtime>> = RefCell::new(None);

    static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    static STABLE_B_TREE_MAPS: RefCell<BTreeMap<u8, AzleStableBTreeMap>> = RefCell::new(BTreeMap::new());
}

#[cfg(all(target_arch = "wasm32", target_os = "wasi"))]
canister_methods!();

#[allow(unused)]
fn execute_js(function_name: &str, pass_arg_data: bool) {
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

            // TODO this returns a value so I think we need to check it to get an error
            method_callback_function.call(&[candid_args_js_value]);

            // TODO might we need to do this in init and post_upgrade?
            context.event_loop().unwrap().run_tick_task();

            // TODO I am not sure what the first parameter to call is supposed to be
            // method_callback
            //     .call(&method_callback, &[candid_args_js_value_ref])
            //     .unwrap();

            // context.execute_pending().unwrap();
        });
    });
}

// Heavily inspired by https://stackoverflow.com/a/47676844
#[no_mangle]
pub fn get_candid_pointer() -> *mut std::os::raw::c_char {
    RUNTIME.with(|runtime| {
        let mut runtime = wasmedge_quickjs::Runtime::new();

        runtime.run_with_context(|context| {
            context.get_global().set(
                "_azleWasmtimeCandidEnvironment",
                wasmedge_quickjs::JsValue::Bool(true),
            );

            ic::register(context);

            context.eval_global_str("globalThis.exports = {};".to_string());
            context.eval_module_str(
                std::str::from_utf8(MAIN_JS).unwrap().to_string(),
                "azle_main",
            );

            let global = context.get_global();

            let candid_info_function = global.get("candidInfoFunction").to_function().unwrap();

            let candid_info = candid_info_function.call(&[]);

            let candid_info_string = candid_info.to_string().unwrap().to_string();

            let c_string = std::ffi::CString::new(candid_info_string).unwrap();

            c_string.into_raw()
        })
    })
}
