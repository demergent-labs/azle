#[allow(unused)]
use canister_methods::canister_methods;
use ic_stable_structures::{
    memory_manager::{MemoryManager, VirtualMemory},
    storable::Bound,
    DefaultMemoryImpl, StableBTreeMap, Storable,
};
use quickjs_wasm_rs::{to_qjs_value, JSContextRef, JSValue};
use std::cell::RefCell;
use std::collections::BTreeMap;

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
    static CONTEXT: RefCell<Option<JSContextRef>> = RefCell::new(None);

    static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    static STABLE_B_TREE_MAPS: RefCell<BTreeMap<u8, AzleStableBTreeMap>> = RefCell::new(BTreeMap::new());
}

#[cfg(all(target_arch = "wasm32", target_os = "wasi"))]
canister_methods!();

#[allow(unused)]
fn execute_js(function_name: &str, pass_arg_data: bool) {
    CONTEXT.with(|context| {
        let mut context = context.borrow_mut();
        let context = context.as_mut().unwrap();

        let global = context.global_object().unwrap();
        let exports = global.get_property("exports").unwrap();
        let canister_methods = exports.get_property("canisterMethods").unwrap();
        let callbacks = canister_methods.get_property("callbacks").unwrap();
        let method_callback = callbacks.get_property(function_name).unwrap();

        let candid_args = if pass_arg_data {
            ic_cdk::api::call::arg_data_raw()
        } else {
            vec![]
        };

        let candid_args_js_value: JSValue = candid_args.into();
        let candid_args_js_value_ref = to_qjs_value(&context, &candid_args_js_value).unwrap();

        // TODO I am not sure what the first parameter to call is supposed to be
        method_callback
            .call(&method_callback, &[candid_args_js_value_ref])
            .unwrap();

        context.execute_pending().unwrap();
    });
}
