use std::{cell::RefCell, collections::BTreeMap, collections::HashMap, convert::TryInto};

#[allow(unused)]
use canister_methods::canister_methods;
use ic_stable_structures::{
    memory_manager::{MemoryId, MemoryManager, VirtualMemory},
    storable::Bound,
    DefaultMemoryImpl, StableBTreeMap, Storable,
};
use include_dir::{include_dir, Dir};
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
    RUNTIME.with(|runtime| {
        let mut runtime = wasmedge_quickjs::Runtime::new();

        runtime.run_with_context(|context| {
            context.get_global().set(
                "_azleWasmtimeCandidEnvironment",
                wasmedge_quickjs::JsValue::Bool(true),
            );

            ic::register(context);

            // TODO what do we do if there is an error in here?
            context.eval_global_str("globalThis.exports = {};".to_string());
            context.eval_module_str(
                std::str::from_utf8(MAIN_JS).unwrap().to_string(),
                "azle_main",
            );

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

// TODO do we need error handling??
// TODO it is much more scalable without error handling
// TODO also it's quick and nimble if it's just best effort
// TODO we can also just spawn off timers until they are all done
// TODO we need some way to store state...across upgrades
// TODO the timer always needs to be set across upgrades
// TODO notify runs out after 500 because of the canister outgoing queue
// TODO calling wallet_receive seems to have no limit, takes few cycles, at least within the same subnet
// TODO management canister, which might be across subnets as an emulation, takes the longest
// TODO not sure if there's any practical limit though

// TODO figure out how to get this to work on mainnet and locally well
#[ic_cdk_macros::update]
pub async fn _azle_open_value_sharing_periodic_payment() {
    ic_cdk::println!("_azle_open_value_sharing_periodic_payment");

    let compiler_info = get_compiler_info("compiler_info.json").unwrap();

    let total_periodic_payment_amount = calculate_total_periodic_payment_amount().await;

    ic_cdk::println!(
        "total_periodic_payment_amount: {}",
        total_periodic_payment_amount
    );

    for (depth, dependency_level) in compiler_info.dependency_info.iter().enumerate() {
        ic_cdk::println!("depth: {}", depth);
        ic_cdk::println!("dependency_level: {:#?}", dependency_level);

        for dependency in dependency_level {
            ic_cdk::println!("dependency: {:#?}", dependency);

            let dependency_periodic_payment_amount = calculate_dependency_periodic_payment_amount(
                dependency,
                dependency_level,
                depth,
                total_periodic_payment_amount,
                depth == compiler_info.dependency_info.len() - 1,
            );

            if dependency.platform == "icp" {
                handle_icp_platform(dependency, dependency_periodic_payment_amount).await;
            }
        }
    }
}

// TODO will this work for queries as well?
#[ic_cdk_macros::update]
pub fn _azle_chunk() {}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct CanisterMethods {
    init: Option<CanisterMethod>,
    post_upgrade: Option<CanisterMethod>,
    pre_upgrade: Option<CanisterMethod>,
    inspect_message: Option<CanisterMethod>,
    heartbeat: Option<CanisterMethod>,
    queries: Vec<CanisterMethod>,
    updates: Vec<CanisterMethod>,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct CanisterMethod {
    name: String,
    composite: Option<bool>,
    guard_name: Option<String>,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct CompilerInfo {
    canister_methods: CanisterMethods,
    env_vars: Vec<(String, String)>,
    dependency_info: Vec<Vec<Dependency>>,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct Dependency {
    name: String,
    weight: u32,
    platform: String,
    asset: String,
    payment_mechanism: String,
    custom: std::collections::HashMap<String, serde_json::Value>,
}

fn get_compiler_info(compiler_info_path: &str) -> Result<CompilerInfo, String> {
    let compiler_info_string = fs::read_to_string(compiler_info_path)
        .map_err(|err| format!("Error reading {compiler_info_path}: {err}"))?;
    let compiler_info: CompilerInfo = serde_json::from_str(&compiler_info_string)
        .map_err(|err| format!("Error parsing {compiler_info_path}: {err}"))?;

    Ok(compiler_info)
}

// TODO do all of the balance and previous calculation stuff here
async fn calculate_total_periodic_payment_amount() -> u128 {
    1_000_000
}

// TODO we also need to take into account the total number of levels
// TODO for example if there is only one level you don't need to cut anything in half
// TODO double-check the weight calculation
fn calculate_dependency_periodic_payment_amount(
    dependency: &Dependency,
    dependency_level: &Vec<Dependency>,
    depth: usize,
    total_periodic_payment_amount: u128,
    bottom: bool,
) -> u128 {
    let adjusted_depth = depth + if bottom { 0 } else { 1 };

    let dependency_level_periodic_payment_amount =
        total_periodic_payment_amount / 2_u128.pow(adjusted_depth as u32);

    ic_cdk::println!(
        "dependency_level_periodic_payment_amount: {}",
        dependency_level_periodic_payment_amount
    );

    let total_dependency_level_weight: u32 = dependency_level
        .iter()
        .map(|dependency| dependency.weight)
        .sum();

    let dependency_ratio = dependency.weight as f64 / total_dependency_level_weight as f64;

    (dependency_level_periodic_payment_amount as f64 * dependency_ratio) as u128
}

async fn handle_icp_platform(dependency: &Dependency, payment_amount: u128) {
    if dependency.asset == "cycles" {
        handle_icp_platform_asset_cycles(dependency, payment_amount).await;
    }
}

async fn handle_icp_platform_asset_cycles(dependency: &Dependency, payment_amount: u128) {
    let principal_string = dependency
        .custom
        .get("principal")
        .unwrap()
        .as_str()
        .unwrap()
        .to_string();
    let principal = candid::Principal::from_text(principal_string).unwrap();

    if dependency.payment_mechanism == "wallet" {
        ic_cdk::println!("wallet");

        ic_cdk::api::call::call_with_payment128::<(Option<()>,), ()>(
            principal,
            "wallet_receive",
            (None,),
            payment_amount,
        ) // TODO do we need to specify None?
        .await
        .unwrap();
    }

    if dependency.payment_mechanism == "deposit" {
        ic_cdk::println!("deposit");

        ic_cdk::api::management_canister::main::deposit_cycles(
            ic_cdk::api::management_canister::main::CanisterIdRecord {
                canister_id: principal,
            },
            payment_amount,
        )
        .await
        .unwrap();
    }

    ic_cdk::println!("successfully sent {} cycles\n\n", payment_amount);

    // TODO add ledger

    // TODO should we error out or just log if this is not supported?
    // ic_cdk::println!(
    //     "payment_mechanism \"{}\" is not supported",
    //     dependency.payment_mechanism
    // );
}
