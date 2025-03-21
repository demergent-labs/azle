use std::error::Error;

use ic_cdk::trap;
use rquickjs::Array;

use crate::{
    benchmarking::{BENCHMARKS_REF_CELL, BenchmarkEntry},
    guards::guard_against_non_controllers,
    rquickjs_utils::with_ctx,
};

#[ic_cdk::update]
fn _azle_chunk() {}

#[ic_cdk::query(guard = guard_against_non_controllers)]
fn _azle_get_benchmarks() -> Vec<BenchmarkEntry> {
    BENCHMARKS_REF_CELL.with(|benchmarks_ref_cell| benchmarks_ref_cell.borrow().clone())
}

#[ic_cdk::query(guard = guard_against_non_controllers)]
fn _azle_actions_len() -> u32 {
    match with_ctx(|ctx| -> Result<u32, Box<dyn Error>> {
        let globals = ctx.globals();

        let _azle_actions: Array = globals.get("_azleActions")?;

        Ok(_azle_actions.len() as u32)
    }) {
        Ok(len) => len,
        Err(e) => trap(&format!("Azle ActionsLenError: {}", e)),
    }
}
