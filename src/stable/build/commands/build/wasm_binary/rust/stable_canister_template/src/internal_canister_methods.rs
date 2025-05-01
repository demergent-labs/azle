use std::error::Error;

use ic_cdk::trap;
use rquickjs::{Array, Object, Value};

use crate::{
    INTER_CANISTER_CALL_FUTURES,
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
fn _azle_reject_callbacks_len() -> u32 {
    let result = with_ctx(|ctx| -> Result<u32, Box<dyn Error>> {
        let globals = ctx.globals();

        let _azle_reject_callbacks: Object = globals.get("_azleRejectCallbacks")?;

        Ok(_azle_reject_callbacks.keys::<Value>().len() as u32)
    });

    match result {
        Ok(len) => len,
        Err(e) => trap(&format!("Azle RejectCallbacksLenError: {}", e)),
    }
}

#[ic_cdk::query(guard = guard_against_non_controllers)]
fn _azle_resolve_callbacks_len() -> u32 {
    let result = with_ctx(|ctx| -> Result<u32, Box<dyn Error>> {
        let globals = ctx.globals();

        let _azle_resolve_callbacks: Object = globals.get("_azleResolveCallbacks")?;

        Ok(_azle_resolve_callbacks.keys::<Value>().len() as u32)
    });

    match result {
        Ok(len) => len,
        Err(e) => trap(&format!("Azle ResolveCallbacksLenError: {}", e)),
    }
}

#[ic_cdk::query(guard = guard_against_non_controllers)]
fn _azle_timer_callbacks_len() -> u32 {
    let result = with_ctx(|ctx| -> Result<u32, Box<dyn Error>> {
        let globals = ctx.globals();

        let _azle_timer_callbacks: Object = globals.get("_azleTimerCallbacks")?;

        Ok(_azle_timer_callbacks.keys::<Value>().len() as u32)
    });

    match result {
        Ok(len) => len,
        Err(e) => trap(&format!("Azle TimerCallbacksLenError: {}", e)),
    }
}

#[ic_cdk::query(guard = guard_against_non_controllers)]
fn _azle_actions_len() -> u32 {
    let result = with_ctx(|ctx| -> Result<u32, Box<dyn Error>> {
        let globals = ctx.globals();

        let _azle_actions: Array = globals.get("_azleActions")?;

        Ok(_azle_actions.len() as u32)
    });

    match result {
        Ok(len) => len,
        Err(e) => trap(&format!("Azle ActionsLenError: {}", e)),
    }
}

#[ic_cdk::query(guard = guard_against_non_controllers)]
fn _azle_inter_canister_call_futures_len() -> u32 {
    INTER_CANISTER_CALL_FUTURES.with(|inter_canister_call_futures_ref_cell| {
        inter_canister_call_futures_ref_cell.borrow().len() as u32
    })
}
