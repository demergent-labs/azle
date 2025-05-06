use std::error::Error;

use candid::Principal;
use ic_cdk::{
    api::call::{RejectionCode, call_raw128, is_recovering_from_trap},
    spawn, trap,
};
use rquickjs::{
    Ctx, Exception, Function, IntoJs, Object, Result as QuickJsResult, TypedArray, Value,
};

use crate::{
    INTER_CANISTER_CALL_FUTURES, InterCanisterCallFuture,
    ic::{drain_microtasks, throw_error},
    rquickjs_utils::{call_with_error_handling, with_ctx},
    state::dispatch_action,
};

#[derive(Clone, Copy)]
enum SettleType {
    Resolve,
    Reject,
}

pub fn get_function(ctx: Ctx) -> QuickJsResult<Function> {
    Function::new(
        ctx.clone(),
        move |global_resolve_id: String,
              global_reject_id: String,
              canister_id_bytes: TypedArray<u8>,
              method: String,
              args_raw: TypedArray<u8>,
              cycles_string: String|
              -> QuickJsResult<()> {
            let canister_id = Principal::from_slice(canister_id_bytes.as_ref());
            let args_raw = args_raw
                .as_bytes()
                .ok_or(throw_error(
                    ctx.clone(),
                    "args_raw could not be converted into bytes",
                ))?
                .to_vec();
            let payment: u128 = cycles_string
                .parse()
                .map_err(|e| throw_error(ctx.clone(), e))?;

            let inter_canister_call_future = Box::pin(async move {
                // My understanding of how this works:
                // scopeguard will execute its closure at the end of the scope.
                // After a successful or unsuccessful inter-canister call (await point)
                // the closure will run, cleaning up the global promise callbacks.
                // Even during a trap, the IC will ensure that the closure runs in its own call
                // thus allowing us to recover from a trap and persist that state
                let _cleanup_scopeguard = scopeguard::guard((), |_| {
                    let result = with_ctx(|ctx| {
                        // JavaScript code execution: macrotask when running as an ICP cleanup callback
                        // The ICP cleanup callback is executed when an inter-canister call reply or reject callback traps
                        // If the reply or reject callback does not trap, this will run in the same call
                        // as the reply or reject callback, and thus won't be a macrotask, but will still
                        // be a JavaScript execution. If the inter-canister call returns synchronously because
                        // of a synchronous error, this will run in the same ICP call as the original
                        // execution that called into call_raw (call in JavaScript), and thus won't be a JavaScript macrotask
                        // but will still be a JavaScript execution
                        cleanup(
                            ctx.clone(),
                            &global_resolve_id,
                            &global_reject_id,
                            is_recovering_from_trap(),
                        )?;

                        // We must drain all microtasks that could have been queued during previous JavaScript executions
                        // Those executions include the settle_promise macrotask, the cleanup call above as a regular
                        // JavaScript execution, or the cleanup callback above as a macrotask execution
                        drain_microtasks(&ctx);

                        Ok(())
                    });

                    if let Err(e) = result {
                        trap(&format!("Azle CallRawCleanupError: {e}"));
                    }

                    // We must drain all inter-canister call futures that could have been queued during previous JavaScript executions
                    // Those executions include the settle_promise macrotask, the cleanup call above as a regular
                    // JavaScript execution, or the cleanup callback above as a macrotask execution
                    // This MUST be called outside of the with_ctx closure
                    drain_inter_canister_call_futures();
                });

                let call_result = call_raw128(canister_id, &method, args_raw, payment).await;

                let result = with_ctx(|ctx| {
                    // JavaScript code execution: macrotask
                    settle_promise(
                        ctx.clone(),
                        &call_result,
                        &global_resolve_id,
                        &global_reject_id,
                    )?;

                    Ok(())
                });

                if let Err(e) = result {
                    trap(&format!("Azle CallRawError: {e}"));
                }
            });

            INTER_CANISTER_CALL_FUTURES.with(|inter_canister_call_futures_ref_cell| {
                inter_canister_call_futures_ref_cell
                    .borrow_mut()
                    .push(inter_canister_call_future)
            });

            Ok(())
        },
    )
}

/// Drains and spawns any queued inter-canister call futures.
///
/// ## Remarks
///
/// Every inter-canister call issued from the JavaScript environment using the `call` API
/// creates an `InterCanisterCallFuture` and pushes it into the
/// thread-local `INTER_CANISTER_CALL_FUTURES`.  
/// When you `.await` such a call, the await can resolve in **two** ways:
///
/// 1. **Asynchronously** — the normal case, where the reply arrives later in a
///    fresh replicated call context (the `reply` or `reject` callback).
/// 2. **Synchronously** — certain errors (e.g. transient network failures) are
///    raised immediately, so the `await` resumes *inside* the original
///    `with_ctx` closure.
///
/// In the synchronous path the continuation is already executing within an
/// outer `with_ctx`; calling `with_ctx` again would panic as `already borrowed`.  
/// To avoid nested-context errors, each future is queued and executed **after**
/// a top-level ICP call's `with_ctx` returns.
///
pub fn drain_inter_canister_call_futures() {
    let inter_canister_call_futures: Vec<InterCanisterCallFuture> = INTER_CANISTER_CALL_FUTURES
        .with(|inter_canister_call_futures_ref_cell| {
            inter_canister_call_futures_ref_cell
                .borrow_mut()
                .drain(..)
                .collect()
        });

    for inter_canister_call_future in inter_canister_call_futures {
        spawn(inter_canister_call_future);
    }
}

fn cleanup(
    ctx: Ctx,
    global_resolve_id: &str,
    global_reject_id: &str,
    inside_cleanup_callback: bool,
) -> Result<(), Box<dyn Error>> {
    if inside_cleanup_callback {
        reject_promise_with_cleanup_callback_error(ctx.clone(), global_reject_id)?;
    }

    dispatch_action(
        ctx.clone(),
        "DELETE_AZLE_RESOLVE_CALLBACK",
        global_resolve_id.into_js(&ctx)?,
        "azle/src/stable/build/commands/build/wasm_binary/rust/stable_canister_template/src/ic/call_raw.rs",
        "cleanup",
    )?;

    dispatch_action(
        ctx.clone(),
        "DELETE_AZLE_REJECT_CALLBACK",
        global_reject_id.into_js(&ctx)?,
        "azle/src/stable/build/commands/build/wasm_binary/rust/stable_canister_template/src/ic/call_raw.rs",
        "cleanup",
    )?;

    Ok(())
}

fn reject_promise_with_cleanup_callback_error(
    ctx: Ctx,
    global_reject_id: &str,
) -> Result<(), Box<dyn Error>> {
    let reject_callback = get_settle_callback(ctx.clone(), SettleType::Reject, global_reject_id)?;

    let reject_code = 10_001;
    let reject_message = "executing within cleanup callback";

    let err_js_object = Exception::from_message(
        ctx.clone(),
        &format!(
            "The inter-canister call's reply or reject callback trapped. Azle reject code {}: {}",
            reject_code, reject_message
        ),
    )?;

    err_js_object.set("rejectCode", reject_code)?;
    err_js_object.set("rejectMessage", reject_message)?;

    call_with_error_handling(&ctx, &reject_callback, (err_js_object,))?;

    Ok(())
}

fn settle_promise<'a>(
    ctx: Ctx<'a>,
    call_result: &Result<Vec<u8>, (RejectionCode, String)>,
    global_resolve_id: &str,
    global_reject_id: &str,
) -> Result<(), Box<dyn Error>> {
    let (settle_type, settle_js_value) = prepare_settle_js_value(ctx.clone(), &call_result)?;
    let settle_callback = get_settle_callback(
        ctx.clone(),
        settle_type,
        if matches!(settle_type, SettleType::Resolve) {
            global_resolve_id
        } else {
            global_reject_id
        },
    )?;

    call_with_error_handling(&ctx, &settle_callback, (settle_js_value,))?;

    Ok(())
}

fn prepare_settle_js_value<'a>(
    ctx: Ctx<'a>,
    call_result: &Result<Vec<u8>, (RejectionCode, String)>,
) -> Result<(SettleType, Value<'a>), Box<dyn Error>> {
    match call_result {
        Ok(candid_bytes) => {
            let candid_bytes_js_value =
                TypedArray::<u8>::new(ctx.clone(), candid_bytes.clone()).into_js(&ctx)?;

            Ok((SettleType::Resolve, candid_bytes_js_value))
        }
        Err(err) => {
            let err_js_object = Exception::from_message(
                ctx.clone(),
                &format!(
                    "The inter-canister call failed with reject code {}: {}",
                    err.0 as i32, &err.1
                ),
            )?;

            err_js_object.set("rejectCode", err.0 as i32)?;
            err_js_object.set("rejectMessage", &err.1)?;

            Ok((SettleType::Reject, err_js_object.into_js(&ctx)?))
        }
    }
}

fn get_settle_callback<'a>(
    ctx: Ctx<'a>,
    settle_type: SettleType,
    settle_global_id: &str,
) -> Result<Function<'a>, Box<dyn Error>> {
    let settle_global_object = get_settle_global_object(ctx.clone(), settle_type)?;
    Ok(settle_global_object.get(settle_global_id)?)
}

fn get_settle_global_object(ctx: Ctx, settle_type: SettleType) -> Result<Object, Box<dyn Error>> {
    let globals = ctx.globals();

    if matches!(settle_type, SettleType::Resolve) {
        Ok(globals.get("_azleResolveCallbacks")?)
    } else {
        Ok(globals.get("_azleRejectCallbacks")?)
    }
}
