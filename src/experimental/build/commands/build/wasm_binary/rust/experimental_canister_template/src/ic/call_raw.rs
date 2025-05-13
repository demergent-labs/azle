use std::error::Error;

use ic_cdk::call::{Call, CallFailed};
use ic_cdk::futures::is_recovering_from_trap;
use wasmedge_quickjs::{AsObject, Context, JsFn, JsObject, JsValue};

use crate::ic::drain_microtasks;

pub enum CallErrorType {
    CallFailed(CallFailed),
    CleanupCallback,
}

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, _this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let global_resolve_id = if let JsValue::String(js_string) = argv.get(0).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };

        let global_reject_id = if let JsValue::String(js_string) = argv.get(1).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };

        let canister_id_bytes = if let JsValue::ArrayBuffer(js_array_buffer) = argv.get(2).unwrap()
        {
            js_array_buffer.to_vec()
        } else {
            panic!("conversion from JsValue to JsArrayBuffer failed")
        };
        let canister_id = candid::Principal::from_slice(&canister_id_bytes);

        let method = if let JsValue::String(js_string) = argv.get(3).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };

        let args_raw = if let JsValue::ArrayBuffer(js_array_buffer) = argv.get(4).unwrap() {
            js_array_buffer.to_vec()
        } else {
            panic!("conversion from JsValue to JsArrayBuffer failed")
        };

        let payment_string = if let JsValue::String(js_string) = argv.get(5).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };
        let payment: u128 = payment_string.parse().unwrap();

        let mut context_clone = context.clone();

        ic_cdk::futures::spawn(async move {
            let mut context_clone_cleanup = context_clone.clone();

            // My understanding of how this works
            // scopeguard will execute its closure at the end of the scope
            // After a successful or unsuccessful cross-canister call (await point)
            // the closure will run, cleaning up the global promise callbacks
            // Even during a trap, the IC will ensure that the closure runs in its own call
            // thus allowing us to recover from a trap and persist that state
            let _cleanup_scopeguard = scopeguard::guard((), |_| {
                let global = context_clone_cleanup.get_global();

                if is_recovering_from_trap() {
                    let call_error = create_call_error(
                        &mut context_clone_cleanup,
                        CallErrorType::CleanupCallback,
                    )
                    .unwrap();

                    let reject = global
                        .get("_azleRejectCallbacks")
                        .to_obj()
                        .unwrap()
                        .get(&global_reject_id)
                        .to_function()
                        .unwrap();

                    let result = reject.call(&[call_error.into()]);

                    // TODO error handling is mostly done in JS right now
                    // TODO we would really like wasmedge-quickjs to add
                    // TODO good error info to JsException and move error handling
                    // TODO out of our own code
                    match &result {
                        wasmedge_quickjs::JsValue::Exception(js_exception) => {
                            js_exception.dump_error();
                            panic!("TODO needs error info");
                        }
                        _ => drain_microtasks(&mut context_clone_cleanup),
                    };
                }

                let resolve_callbacks = global.get("_azleResolveCallbacks");
                let reject_callbacks = global.get("_azleRejectCallbacks");

                resolve_callbacks
                    .to_obj()
                    .unwrap()
                    .delete(&global_resolve_id);
                reject_callbacks.to_obj().unwrap().delete(&global_reject_id);
            });

            let call_result = Call::unbounded_wait(canister_id, &method)
                .with_raw_args(&args_raw)
                .with_cycles(payment)
                .await;

            let global = context_clone.get_global();

            let (should_resolve, js_value) = match call_result {
                Ok(response) => {
                    let candid_bytes_js_value: JsValue = context_clone
                        .new_array_buffer(&response.into_bytes())
                        .into();

                    (true, candid_bytes_js_value)
                }
                Err(call_failed) => {
                    let call_error = create_call_error(
                        &mut context_clone,
                        CallErrorType::CallFailed(call_failed),
                    )
                    .unwrap();

                    (false, call_error.into())
                }
            };

            if should_resolve {
                let resolve = global
                    .get("_azleResolveCallbacks")
                    .to_obj()
                    .unwrap()
                    .get(&global_resolve_id)
                    .to_function()
                    .unwrap();

                let result = resolve.call(&[js_value.clone()]);

                // TODO error handling is mostly done in JS right now
                // TODO we would really like wasmedge-quickjs to add
                // TODO good error info to JsException and move error handling
                // TODO out of our own code
                match &result {
                    wasmedge_quickjs::JsValue::Exception(js_exception) => {
                        js_exception.dump_error();
                        panic!("TODO needs error info");
                    }
                    _ => drain_microtasks(&mut context_clone),
                };
            } else {
                let reject = global
                    .get("_azleRejectCallbacks")
                    .to_obj()
                    .unwrap()
                    .get(&global_reject_id)
                    .to_function()
                    .unwrap();

                let result = reject.call(&[js_value.clone()]);

                // TODO error handling is mostly done in JS right now
                // TODO we would really like wasmedge-quickjs to add
                // TODO good error info to JsException and move error handling
                // TODO out of our own code
                match &result {
                    wasmedge_quickjs::JsValue::Exception(js_exception) => {
                        js_exception.dump_error();
                        panic!("TODO needs error info");
                    }
                    _ => drain_microtasks(&mut context_clone),
                };
            }
        });

        JsValue::UnDefined
    }
}

pub fn create_call_error<'a>(
    context: &mut Context,
    call_error_type: CallErrorType,
) -> Result<JsObject, Box<dyn Error>> {
    let call_error = match call_error_type {
        CallErrorType::CallFailed(call_failed) => match &call_failed {
            CallFailed::InsufficientLiquidCycleBalance(insufficient_liquid_cycle_balance) => {
                let mut exception = create_call_error_exception(
                    context,
                    "InsufficientLiquidCycleBalance",
                    &call_failed.to_string(),
                )?;

                exception.set(
                    "available",
                    context.eval_global_str(format!(
                        "{}n",
                        insufficient_liquid_cycle_balance.available
                    )),
                );
                exception.set(
                    "required",
                    context.eval_global_str(format!(
                        "{}n",
                        insufficient_liquid_cycle_balance.required
                    )),
                );

                exception
            }
            CallFailed::CallPerformFailed(_) => {
                create_call_error_exception(context, "CallPerformFailed", &call_failed.to_string())?
            }
            CallFailed::CallRejected(call_rejected) => {
                let mut exception =
                    create_call_error_exception(context, "CallRejected", &call_failed.to_string())?;

                exception.set("rejectCode", (call_rejected.reject_code()? as i32).into());
                exception.set(
                    "rejectMessage",
                    context.new_string(call_rejected.reject_message()).into(),
                );

                exception
            }
        },
        CallErrorType::CleanupCallback => {
            let mut exception = create_call_error_exception(
                context,
                "CleanupCallback",
                "executing within cleanup callback",
            )?;

            exception.set("rejectCode", 10_001.into());
            exception.set(
                "rejectMessage",
                context
                    .new_string("executing within cleanup callback")
                    .into(),
            );

            exception
        }
    };

    Ok(call_error)
}

fn create_call_error_exception(
    context: &mut Context,
    call_error_type: &str,
    message: &str,
) -> Result<JsObject, Box<dyn Error>> {
    let mut exception = context.new_error(message).to_obj().unwrap();

    exception.set("type", context.new_string(call_error_type).into());

    Ok(exception)
}
