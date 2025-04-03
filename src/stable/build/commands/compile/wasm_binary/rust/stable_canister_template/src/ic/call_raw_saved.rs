use std::error::Error;

use candid::Principal;
use ic_cdk::{
    api::call::{CallResult, call_raw128},
    trap,
};
use rquickjs::{Ctx, Exception, Function, Promise, Result as RQuickJsResult, TypedArray};

use crate::{ic::throw_error, rquickjs_utils::call_with_error_handling};

// TODO okay the problme now is this: it seems like we can't even have any overlapping inter-canister calls
// TODO if we do, one of the calls does not get a reply
// TODO that is on top of the mutex error that we are now getting in 0.17.1 and 0.18.0-alpha.2
pub fn get_function(ctx: Ctx) -> RQuickJsResult<Function> {
    Function::new(
        ctx.clone(),
        move |canister_id_bytes: TypedArray<u8>,
              method: String,
              args_raw: TypedArray<u8>,
              cycles_string: String|
              -> RQuickJsResult<Promise> {
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

            let (promise, resolve, reject) = ctx.promise()?;

            let ctx_for_spawn = ctx.clone();

            // We use ctx.spawn from rquickjs instead of ic_cdk::spawn because
            // ctx.spawn does not require 'static lifetimes for values passed into the closure
            ctx.spawn(async move {
                let time_before = ic_cdk::api::time();
                ic_cdk::println!("time_before: {time_before}");

                let call_result = call_raw128(canister_id, &method, args_raw, payment).await;

                let time_after = ic_cdk::api::time();
                ic_cdk::println!("time_after: {time_after}");

                if let Err(err) = &call_result {
                    ic_cdk::println!("call_result: {:?}", err);
                }

                let in_cleanup_callback =
                    call_result.is_err() && call_result.as_ref().err().unwrap().1 == "cleanup";

                ic_cdk::println!("in_cleanup_callback: {:?}", in_cleanup_callback);

                if in_cleanup_callback {
                    return;
                }

                let settle_result = settle(&ctx_for_spawn, &resolve, &reject, call_result);

                ic_cdk::println!("settling complete");

                if let Err(e) = settle_result {
                    trap(&format!("Azle CallRawError: {e}"));
                }
            });

            // TODO test solution 2
            // TODO 49,000 seconds and no memory leak detected, no mutex error
            // ctx.spawn(async move {
            //     // TODO our error for cleanup needs to be stable for 1.0, even if the cdk changes
            //     let call_result = call_raw128(canister_id, &method, args_raw, payment).await;

            //     let settle_result = settle(&ctx_for_spawn, &resolve, &reject, call_result);

            //     if let Err(e) = settle_result {
            //         trap(&format!("Azle CallRawError: {e}"));
            //     }
            // });

            Ok(promise)
        },
    )
}

fn settle<'a>(
    ctx: &Ctx<'a>,
    resolve: &Function<'a>,
    reject: &Function<'a>,
    call_result: CallResult<Vec<u8>>,
) -> Result<(), Box<dyn Error>> {
    ic_cdk::println!("about to settle");

    match call_result {
        Ok(candid_bytes) => {
            ic_cdk::println!("resolving");

            call_with_error_handling(
                ctx,
                resolve,
                (TypedArray::<u8>::new(ctx.clone(), candid_bytes),),
            )?;

            Ok(())
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

            ic_cdk::println!("rejecting");

            call_with_error_handling(ctx, reject, (err_js_object,))?;

            Ok(())
        }
    }
}
