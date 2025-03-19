use candid::Principal;
use ic_cdk::api::call::call_raw128;
use rquickjs::{Ctx, Function, Promise, Result as QuickJsResult, TypedArray};

use crate::ic::throw_error;

pub fn get_function(ctx: Ctx) -> QuickJsResult<Function> {
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
              cycles_string: String| {
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

            Promise::wrap_future(&ctx, async move {
                let bytes = call_raw128(canister_id, &method, args_raw, payment)
                    .await
                    .unwrap();

                let ctx = unsafe { Ctx::from_raw(ctx_ptr) };

                TypedArray::<u8>::new(ctx.clone(), bytes)
            })
        },
    )
}
