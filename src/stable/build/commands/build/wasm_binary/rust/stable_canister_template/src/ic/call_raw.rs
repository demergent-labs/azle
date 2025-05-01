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
    ic::throw_error,
    rquickjs_utils::{call_with_error_handling, drain_microtasks, with_ctx},
    state::dispatch_action,
};

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

            // TODO look into the need for the Box::pin
            let inter_canister_call_future = Box::pin(async move {
                // My understanding of how this works:
                // scopeguard will execute its closure at the end of the scope.
                // After a successful or unsuccessful inter-canister call (await point)
                // the closure will run, cleaning up the global promise callbacks.
                // Even during a trap, the IC will ensure that the closure runs in its own call
                // thus allowing us to recover from a trap and persist that state
                let _cleanup = scopeguard::guard((), |_| {
                    let result = with_ctx(|ctx| {
                        // JavaScript code execution: macrotask when running as an ICP cleanup callback
                        // The ICP cleanup callback is executed when an inter-canister call reply or reject callback traps
                        // If the reply or reject callback does not trap, this will run in the same call
                        // as the reply or reject callback, and thus won't be a macrotask, but will still
                        // be a JavaScript execution
                        cleanup(
                            ctx.clone(),
                            &global_resolve_id,
                            &global_reject_id,
                            is_recovering_from_trap(),
                        )?;

                        // We must drain all microtasks that could have been queued during previous JavaScript executions
                        // Those executions include the resolve_or_reject macrotask, the cleanup call above as a regular
                        // JavaScript execution, or the cleanup callback above as a macrotask execution
                        drain_microtasks(&ctx);

                        Ok(())
                    });

                    if let Err(e) = result {
                        trap(&format!("Azle CallRawCleanupError: {e}"));
                    }

                    // This MUST be called outside of the with_ctx closure
                    drain_inter_canister_call_futures();
                });

                let call_result = call_raw128(canister_id, &method, args_raw, payment).await;

                let result = with_ctx(|ctx| {
                    // JavaScript code execution: macrotask
                    resolve_or_reject(
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
        let reject_callback =
            get_callback(ctx.clone(), false, global_resolve_id, global_reject_id)?;

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
    }

    dispatch_action(
        ctx.clone(),
        "DELETE_AZLE_RESOLVE_CALLBACK",
        global_resolve_id.into_js(&ctx)?,
        "azle/src/stable/build/commands/compile/wasm_binary/rust/stable_canister_template/src/ic/call_raw.rs",
        "cleanup",
    )?;

    dispatch_action(
        ctx.clone(),
        "DELETE_AZLE_REJECT_CALLBACK",
        global_reject_id.into_js(&ctx)?,
        "azle/src/stable/build/commands/compile/wasm_binary/rust/stable_canister_template/src/ic/call_raw.rs",
        "cleanup",
    )?;

    Ok(())
}

fn resolve_or_reject<'a>(
    ctx: Ctx<'a>,
    call_result: &Result<Vec<u8>, (RejectionCode, String)>,
    global_resolve_id: &str,
    global_reject_id: &str,
) -> Result<(), Box<dyn Error>> {
    let (should_resolve, js_value) = prepare_js_value(ctx.clone(), &call_result)?;
    let callback = get_callback(
        ctx.clone(),
        should_resolve,
        global_resolve_id,
        global_reject_id,
    )?;

    call_with_error_handling(&ctx, &callback, (js_value,))?;

    Ok(())
}

fn prepare_js_value<'a>(
    ctx: Ctx<'a>,
    call_result: &Result<Vec<u8>, (RejectionCode, String)>,
) -> Result<(bool, Value<'a>), Box<dyn Error>> {
    match call_result {
        Ok(candid_bytes) => {
            let candid_bytes_js_value =
                TypedArray::<u8>::new(ctx.clone(), candid_bytes.clone()).into_js(&ctx)?;

            Ok((true, candid_bytes_js_value))
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

            Ok((false, err_js_object.into_js(&ctx)?))
        }
    }
}

fn get_callback<'a>(
    ctx: Ctx<'a>,
    should_resolve: bool,
    global_resolve_id: &str,
    global_reject_id: &str,
) -> Result<Function<'a>, Box<dyn Error>> {
    let global_object = get_resolve_or_reject_global_object(ctx.clone(), should_resolve)?;
    let callback_name = if should_resolve {
        global_resolve_id
    } else {
        global_reject_id
    };

    Ok(global_object.get(callback_name)?)
}

fn get_resolve_or_reject_global_object(
    ctx: Ctx,
    should_resolve: bool,
) -> Result<Object, Box<dyn Error>> {
    let globals = ctx.globals();

    if should_resolve {
        Ok(globals.get("_azleResolveCallbacks")?)
    } else {
        Ok(globals.get("_azleRejectCallbacks")?)
    }
}

// TODO I feel like all of this JS stuff could use a nice refactor
