use std::{cell::RefCell, error::Error};

use candid::CandidType;
use ic_cdk::api::time;
use rquickjs::Object;

use crate::quickjs_with_ctx;

#[derive(CandidType, Debug, Clone)]
pub struct BenchmarkEntry {
    pub method_name: String,
    pub instructions: u64,
    pub timestamp: u64,
}

thread_local! {
    pub static BENCHMARKS_REF_CELL: RefCell<Vec<BenchmarkEntry>> = RefCell::new(Vec::new());
}

pub fn record_benchmark(function_name: &str, instructions: u64) -> Result<(), Box<dyn Error>> {
    quickjs_with_ctx(|ctx| {
        let timestamp = time();

        let method_names: Object = ctx
            .clone()
            .globals()
            .get("_azleCanisterMethodNames")
            .map_err(|e| format!("Failed to get globalThis._azleCanisterMethodNames: {e}"))?;

        let method_name: String = method_names.get(function_name).map_err(|e| {
            format!("Failed to get globalThis._azleCanisterMethodNames[{function_name}]: {e}")
        })?;

        BENCHMARKS_REF_CELL.with(|benchmarks_ref_cell| {
            let mut benchmarks = benchmarks_ref_cell.borrow_mut();
            benchmarks.push(BenchmarkEntry {
                method_name,
                instructions,
                timestamp,
            });
        });

        Ok(())
    })
}
