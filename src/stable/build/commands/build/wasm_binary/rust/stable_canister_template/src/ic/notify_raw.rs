use candid::Principal;
use ic_cdk::call::{Call, CallFailed, OnewayError};
use rquickjs::{Ctx, Function, IntoJs, Result, TypedArray, Undefined, Value};

use crate::ic::{
    call_raw::{CallErrorType, create_call_error},
    throw_error,
};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(
        ctx.clone(),
        move |canister_id_bytes: TypedArray<u8>,
              method: String,
              args_raw: TypedArray<u8>,
              cycles_string: String|
              -> Result<Value> {
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

            let notify_result = Call::unbounded_wait(canister_id, &method)
                .with_raw_args(&args_raw)
                .with_cycles(payment)
                .oneway();

            match notify_result {
                Ok(_) => Undefined.into_js(&ctx),
                Err(oneway_error) => {
                    let call_error = create_call_error(
                        ctx.clone(),
                        match oneway_error {
                            OnewayError::CallPerformFailed(call_perform_failed) => {
                                CallErrorType::CallFailed(CallFailed::CallPerformFailed(
                                    call_perform_failed,
                                ))
                            }
                            OnewayError::InsufficientLiquidCycleBalance(
                                insufficient_liquid_cycle_balance,
                            ) => CallErrorType::CallFailed(
                                CallFailed::InsufficientLiquidCycleBalance(
                                    insufficient_liquid_cycle_balance,
                                ),
                            ),
                        },
                    )
                    .map_err(|e| throw_error(ctx.clone(), e))?;

                    Ok(call_error.into_js(&ctx)?)
                }
            }
        },
    )
}
