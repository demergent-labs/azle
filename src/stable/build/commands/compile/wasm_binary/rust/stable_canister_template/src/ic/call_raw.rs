use candid::Principal;
use ic_cdk::{api::call::call_raw128, spawn};
use rquickjs::{Ctx, Exception, Function, Promise, Result, Result as QuickJsResult, TypedArray};

use crate::{
    error::quickjs_call_with_error_handling, ic::throw_error, quickjs_with_ctx::run_event_loop,
};

pub fn get_function(ctx: Ctx<'static>) -> QuickJsResult<Function<'static>> {
    // We use a raw pointer here to deal with already borrowed issues
    // using quickjs_with_ctx after a cross-canister call (await point)
    // Sometimes the await point won't actually behave like a full await point
    // because the cross-canister call returns an error where the callback
    // is never queued and executed by the IC
    // In this case the outer quickjs_with_ctx for the original call
    // will still have borrowed something having to do with the ctx
    // whereas in a full cross-canister call the outer quickjs_with_ctx
    // will have completed.
    // Using a raw pointer overcomes the issue, and I believe it is safe
    // because we only ever have one Runtime, one Context, we never destroy them
    // and we are in a single-threaded environment. We will of course
    // engage in intense testing and review to ensure safety
    let ctx_ptr = ctx.as_raw();

    Function::new(
        ctx.clone(),
        move |canister_id_bytes: TypedArray<u8>,
              method: String,
              args_raw: TypedArray<u8>,
              cycles_string: String|
              -> Result<Promise> {
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

            let (promise, resolve, reject) = ctx.promise().unwrap();

            spawn(async move {
                // TODO let's crush this ctx pointer
                let ctx = unsafe { Ctx::from_raw(ctx_ptr) };

                let call_result = call_raw128(canister_id, &method, args_raw, payment).await;

                match call_result {
                    Ok(candid_bytes) => {
                        quickjs_call_with_error_handling(
                            ctx.clone(),
                            resolve,
                            (TypedArray::<u8>::new(ctx.clone(), candid_bytes),),
                        )
                        .unwrap();
                    }
                    Err(err) => {
                        let err_js_object = Exception::from_message(
                            ctx.clone(),
                            &format!(
                                "The inter-canister call failed with reject code {}: {}",
                                err.0 as i32, &err.1
                            ),
                        )
                        .unwrap();

                        err_js_object.set("rejectCode", err.0 as i32).unwrap();
                        err_js_object.set("rejectMessage", &err.1).unwrap();

                        quickjs_call_with_error_handling(ctx.clone(), reject, (err_js_object,))
                            .unwrap();
                    }
                };

                run_event_loop(ctx.clone());
            });

            Ok(promise)
        },
    )
}
