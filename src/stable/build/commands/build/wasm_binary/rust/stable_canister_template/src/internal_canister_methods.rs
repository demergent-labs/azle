use std::error::Error;

use ic_cdk::{query, trap, update};
use rquickjs::{Array, Object, Value};

use crate::{
    CONTEXT_REF_CELL, INTER_CANISTER_CALL_FUTURES,
    benchmarking::{BENCHMARKS_REF_CELL, BenchmarkEntry},
    guards::guard_against_non_controllers,
    rquickjs_utils::with_ctx,
};

/// Used in conjunction with the JavaScript `chunk` function to increase the effective update call instruction limit.
#[update]
fn _azle_chunk() {}

/// Returns the stored benchmarks if the benchmarking functionality is enabled.
#[query(guard = "guard_against_non_controllers")]
fn _azle_get_benchmarks() -> Vec<BenchmarkEntry> {
    BENCHMARKS_REF_CELL.with(|benchmarks_ref_cell| benchmarks_ref_cell.borrow().clone())
}

/// Returns the current length of globalThis._azleRejectCallbacks to aid in testing for memory leaks and other global state issues.
#[query(guard = "guard_against_non_controllers")]
fn _azle_reject_callbacks_len() -> u32 {
    let result = with_ctx(|ctx| -> Result<u32, Box<dyn Error>> {
        let globals = ctx.globals();

        let _azle_reject_callbacks: Option<Object> = globals.get("_azleRejectCallbacks").ok();
        
        if let Some(reject_callbacks) = _azle_reject_callbacks {
            Ok(reject_callbacks.keys::<Value>().len() as u32)
        } else {
            Ok(0)
        }
    });

    match result {
        Ok(len) => len,
        Err(e) => trap(&format!("Azle RejectCallbacksLenError: {}", e)),
    }
}

/// Returns the current length of globalThis._azleResolveCallbacks to aid in testing for memory leaks and other global state issues.
#[query(guard = "guard_against_non_controllers")]
fn _azle_resolve_callbacks_len() -> u32 {
    let result = with_ctx(|ctx| -> Result<u32, Box<dyn Error>> {
        let globals = ctx.globals();

        let _azle_resolve_callbacks: Option<Object> = globals.get("_azleResolveCallbacks").ok();
        
        if let Some(resolve_callbacks) = _azle_resolve_callbacks {
            Ok(resolve_callbacks.keys::<Value>().len() as u32)
        } else {
            Ok(0)
        }
    });

    match result {
        Ok(len) => len,
        Err(e) => trap(&format!("Azle ResolveCallbacksLenError: {}", e)),
    }
}

/// Returns the current length of globalThis._azleTimerCallbacks to aid in testing for memory leaks and other global state issues.
#[query(guard = "guard_against_non_controllers")]
fn _azle_timer_callbacks_len() -> u32 {
    let result = with_ctx(|ctx| -> Result<u32, Box<dyn Error>> {
        let globals = ctx.globals();

        let _azle_timer_callbacks: Option<Object> = globals.get("_azleTimerCallbacks").ok();
        
        if let Some(timer_callbacks) = _azle_timer_callbacks {
            Ok(timer_callbacks.keys::<Value>().len() as u32)
        } else {
            Ok(0)
        }
    });

    match result {
        Ok(len) => len,
        Err(e) => trap(&format!("Azle TimerCallbacksLenError: {}", e)),
    }
}

/// Returns the current length of globalThis._azleActions to aid in testing for memory leaks and other global state issues.
#[query(guard = "guard_against_non_controllers")]
fn _azle_actions_len() -> u32 {
    let result = with_ctx(|ctx| -> Result<u32, Box<dyn Error>> {
        let globals = ctx.globals();

        let _azle_actions: Option<Array> = globals.get("_azleActions").ok();
        
        if let Some(actions) = _azle_actions {
            Ok(actions.len() as u32)
        } else {
            Ok(0)
        }
    });

    match result {
        Ok(len) => len,
        Err(e) => trap(&format!("Azle ActionsLenError: {}", e)),
    }
}

/// Returns the current length of the INTER_CANISTER_CALL_FUTURES Vec to aid in testing for memory leaks and other global state issues.
#[query(guard = "guard_against_non_controllers")]
fn _azle_inter_canister_call_futures_len() -> u32 {
    INTER_CANISTER_CALL_FUTURES.with(|inter_canister_call_futures_ref_cell| {
        inter_canister_call_futures_ref_cell.borrow().len() as u32
    })
}

/// Returns the current length of the QuickJS internal job queue to aid in testing for event loop problems, memory leaks, and other global state issues.
#[query(guard = "guard_against_non_controllers")]
fn _azle_is_job_queue_empty() -> bool {
    let result = CONTEXT_REF_CELL.with(|context_ref_cell| -> Result<bool, Box<dyn Error>> {
        let context = context_ref_cell
            .borrow()
            .clone()
            .ok_or("QuickJS context not initialized")?;
        let runtime = context.runtime();

        Ok(!runtime.is_job_pending())
    });

    match result {
        Ok(is_empty) => is_empty,
        Err(e) => trap(&format!("Azle IsJobQueueEmptyError: {}", e)),
    }
}
