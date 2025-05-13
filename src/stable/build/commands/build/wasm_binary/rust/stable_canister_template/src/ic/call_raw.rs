use std::error::Error;

use candid::Principal;
use ic_cdk::{
    call::{Call, CallFailed, Response},
    futures::{is_recovering_from_trap, spawn},
    trap,
};
use rquickjs::{
    BigInt, Ctx, Exception, Function, IntoJs, Object, Result as QuickJsResult, TypedArray, Value,
};

use crate::{
    INTER_CANISTER_CALL_FUTURES, InterCanisterCallFuture,
    ic::{drain_microtasks, throw_error},
    rquickjs_utils::{call_with_error_handling, with_ctx},
    state::dispatch_action,
};

pub enum CallErrorType {
    CallFailed(CallFailed),
    CleanupCallback,
}

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
                // the closure will run, cleaning up the global promise callbacks and settling the inter-canister promise.
                // Even during a trap, the IC will ensure that the closure runs in its own call (the cleanup callback)
                // thus allowing us to recover from a trap and persist that state
                let _cleanup_scopeguard = scopeguard::guard((), |_| {
                    let result = with_ctx(|ctx| {
                        // JavaScript code execution: macrotask (when running as an ICP cleanup callback)
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

                        // We must drain all microtasks that could have been queued during previous JavaScript executions.
                        // Those executions include the settle_promise JavaScript execution as a macrotask or regular execution,
                        // the cleanup call above as a regular JavaScript execution, or the cleanup call above as a macrotask execution
                        drain_microtasks(&ctx);

                        Ok(())
                    });

                    if let Err(e) = result {
                        trap(&format!("Azle CallRawCleanupError: {e}"));
                    }

                    // We must drain all inter-canister call futures that could have been queued during previous JavaScript executions.
                    // Those executions include the settle_promise JavaScript execution as a macrotask or regular execution,
                    // the cleanup call above as a regular JavaScript execution, or the cleanup call above as a macrotask execution.
                    // This MUST be called outside of the with_ctx closure or it will trap
                    drain_inter_canister_call_futures();
                });

                let call_result = Call::unbounded_wait(canister_id, &method)
                    .with_raw_args(&args_raw)
                    .with_cycles(payment)
                    .await;

                let result = with_ctx(|ctx| {
                    // JavaScript code execution: macrotask (when call_raw128.await does not return synchronously)
                    settle_promise(
                        ctx.clone(),
                        call_result,
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

/// Constructs the error object that will be used to reject the promise in the cleanup callback.
///
/// ## Remarks
///
/// If the reply or reject callback of an inter-canister call traps, then the IC will
/// execute something called the cleanup callback, which is its own call execution.
/// The purpose is to be able to clean up state from before the call that would have
/// been cleaned up in the reply or reject callback.
///
/// In the cleanup callback, we settle the promise with this special error object.
/// The developer can detect this and clean up their own state if they'd like,
/// though they must not trap during the execution of the cleanup callback.
fn reject_promise_with_cleanup_callback_error(
    ctx: Ctx,
    global_reject_id: &str,
) -> Result<(), Box<dyn Error>> {
    let reject_callback = get_settle_callback(ctx.clone(), SettleType::Reject, global_reject_id)?;

    let call_error = create_call_error(ctx.clone(), CallErrorType::CleanupCallback)?;

    call_with_error_handling(&ctx, &reject_callback, (call_error,))?;

    Ok(())
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

/// Creates the JavaScript error object that will be used to reject the inter-canister call promise.
///
/// ## Remarks
///
/// This function will create the JavaScript error object for all inter-canister call error cases, including oneway calls and cleanup callbacks.
/// Those cases are:
/// - InsufficientLiquidCycleBalance
/// - CallPerformFailed
/// - CallRejected
/// - CleanupCallback
pub fn create_call_error<'a>(
    ctx: Ctx<'a>,
    call_error_type: CallErrorType,
) -> Result<Exception<'a>, Box<dyn Error>> {
    let call_error = match call_error_type {
        CallErrorType::CallFailed(call_failed) => match &call_failed {
            CallFailed::InsufficientLiquidCycleBalance(insufficient_liquid_cycle_balance) => {
                let exception = create_call_error_exception(
                    ctx.clone(),
                    "InsufficientLiquidCycleBalance",
                    &call_failed.to_string(),
                )?;

                exception.set(
                    "available",
                    ctx.eval::<BigInt, &str>(&format!(
                        "{}n",
                        insufficient_liquid_cycle_balance.available
                    ))?,
                )?;
                exception.set(
                    "required",
                    ctx.eval::<BigInt, &str>(&format!(
                        "{}n",
                        insufficient_liquid_cycle_balance.required
                    ))?,
                )?;

                exception
            }
            CallFailed::CallPerformFailed(_) => create_call_error_exception(
                ctx.clone(),
                "CallPerformFailed",
                &call_failed.to_string(),
            )?,
            CallFailed::CallRejected(call_rejected) => {
                let exception = create_call_error_exception(
                    ctx.clone(),
                    "CallRejected",
                    &call_failed.to_string(),
                )?;

                exception.set("rejectCode", call_rejected.reject_code()? as u32)?;
                exception.set("rejectMessage", call_rejected.reject_message())?;

                exception
            }
        },
        CallErrorType::CleanupCallback => {
            let exception = create_call_error_exception(
                ctx.clone(),
                "CleanupCallback",
                "executing within cleanup callback",
            )?;

            exception.set("rejectCode", 10_001)?;
            exception.set("rejectMessage", "executing within cleanup callback")?;

            exception
        }
    };

    Ok(call_error)
}

fn create_call_error_exception<'a>(
    ctx: Ctx<'a>,
    call_error_type: &str,
    message: &str,
) -> Result<Exception<'a>, Box<dyn Error>> {
    let exception = Exception::from_message(ctx.clone(), message)?;

    exception.set("type", call_error_type)?;

    Ok(exception)
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

fn settle_promise<'a>(
    ctx: Ctx<'a>,
    call_result: Result<Response, CallFailed>,
    global_resolve_id: &str,
    global_reject_id: &str,
) -> Result<(), Box<dyn Error>> {
    let (settle_type, settle_js_value) = prepare_settle_js_value(ctx.clone(), call_result)?;
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
    call_result: Result<Response, CallFailed>,
) -> Result<(SettleType, Value<'a>), Box<dyn Error>> {
    match call_result {
        Ok(response) => {
            let candid_bytes_js_value =
                TypedArray::<u8>::new(ctx.clone(), response.into_bytes()).into_js(&ctx)?;

            Ok((SettleType::Resolve, candid_bytes_js_value))
        }
        Err(call_failed) => Ok((
            SettleType::Reject,
            create_call_error(ctx.clone(), CallErrorType::CallFailed(call_failed))?
                .into_js(&ctx)?,
        )),
    }
}
