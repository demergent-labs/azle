use std::{cell::RefCell, error::Error};

use candid::CandidType;
use ic_cdk::api::time;
use rquickjs::Object;

use crate::rquickjs_utils::with_ctx;

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
    with_ctx(|ctx| {
        let timestamp = time();

        let method_name = if let Ok(method_names) = ctx.clone().globals().get::<_, Object>("_azleCanisterMethodNames") {
            if let Ok(name) = method_names.get::<_, String>(function_name) {
                name
            } else {
                // If we can't get the method name, use the function name as a fallback
                function_name.to_string()
            }
        } else {
            // If _azleCanisterMethodNames doesn't exist, use the function name
            function_name.to_string()
        };

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
