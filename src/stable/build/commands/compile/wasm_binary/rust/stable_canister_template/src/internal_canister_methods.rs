use std::error::Error;

use rquickjs::Array;

use crate::{
    benchmarking::{BENCHMARKS_REF_CELL, BenchmarkEntry},
    guards::guard_against_non_controllers,
    quickjs_with_ctx::quickjs_with_ctx,
};

#[ic_cdk::update]
fn _azle_chunk() {}

#[ic_cdk::query(guard = guard_against_non_controllers)]
fn _azle_get_benchmarks() -> Vec<BenchmarkEntry> {
    BENCHMARKS_REF_CELL.with(|benchmarks_ref_cell| benchmarks_ref_cell.borrow().clone())
}

#[ic_cdk::query(guard = guard_against_non_controllers)]
fn _azle_actions_len() -> u32 {
    let result = quickjs_with_ctx(|ctx| -> Result<u32, Box<dyn Error>> {
        let globals = ctx.globals();

        let _azle_actions: Array = globals.get("_azleActions")?;

        Ok(_azle_actions.len() as u32)
    })
    .unwrap();

    result
}
