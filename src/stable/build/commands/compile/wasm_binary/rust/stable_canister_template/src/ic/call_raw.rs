use std::error::Error;

use candid::Principal;
use ic_cdk::{
    api::call::{CallResult, call_raw128},
    trap,
};
use rquickjs::{Ctx, Exception, Function, Promise, Result as RQuickJsResult, TypedArray};

use crate::{ic::throw_error, rquickjs_utils::call_with_error_handling};

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

            ctx.spawn(async move {
                let call_result = call_raw128(canister_id, &method, args_raw, payment).await;

                let settle_result = settle(&ctx_for_spawn, &resolve, &reject, call_result);

                if let Err(e) = settle_result {
                    trap(&format!("Azle CallRawError: {e}"));
                }
            });

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
    match call_result {
        Ok(candid_bytes) => {
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

            call_with_error_handling(ctx, reject, (err_js_object,))?;

            Ok(())
        }
    }
}
