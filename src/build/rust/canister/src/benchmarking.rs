use std::cell::RefCell;
use std::collections::BTreeMap;

use ::candid::CandidType;
use wasmedge_quickjs::{AsObject, Context};

#[derive(CandidType, Debug, Clone)]
pub struct BenchmarkEntry {
    pub method_name: String,
    pub instructions: u64,
}

thread_local! {
    pub static BENCHMARKS: RefCell<BTreeMap<u64, BenchmarkEntry>> = RefCell::new(BTreeMap::new());
}

pub fn record_benchmark(context: &mut Context, function_name: &str) {
    let instructions = ic_cdk::api::performance_counter(1);
    let timestamp = ic_cdk::api::time();

    let global = context.get_global();
    let method_names = global.get("_azleCanisterMethodNames");
    let method_name = method_names
        .get(function_name)
        .unwrap()
        .to_string()
        .unwrap()
        .to_string();

    BENCHMARKS.with(|benchmarks| {
        benchmarks.borrow_mut().insert(
            timestamp,
            BenchmarkEntry {
                method_name,
                instructions,
            },
        );
    });
}
