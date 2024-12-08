use std::error::Error;

use candid::Principal;
use ic_cdk::{
    api::call::{call_raw128, RejectionCode},
    spawn, trap,
};
use rquickjs::{
    Ctx, Exception, Function, IntoJs, Object, Result as QuickJsResult, TypedArray, Value,
};

use crate::{error::quickjs_call_with_error_handling, ic::throw_error, quickjs_with_ctx};

pub fn get_function(ctx: Ctx) -> QuickJsResult<Function> {
    Function::new(
        ctx.clone(),
        move |promise_id: String,
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

            spawn(async move {
                let call_result = call_raw128(canister_id, &method, args_raw, payment).await;

                let result = quickjs_with_ctx(|ctx| {
                    resolve_or_reject(ctx.clone(), &call_result, &promise_id)?;

                    Ok(())
                });

                if let Err(e) = result {
                    trap(&format!("Azle CallRawError: {e}"));
                }
            });

            Ok(())
        },
    )
}

fn resolve_or_reject<'a>(
    ctx: Ctx<'a>,
    call_result: &Result<Vec<u8>, (RejectionCode, String)>,
    promise_id: &str,
) -> Result<(), Box<dyn Error>> {
    let (should_resolve, js_value) = prepare_js_value(ctx.clone(), &call_result)?;
    let callback = get_callback(ctx.clone(), &promise_id, should_resolve)?;

    quickjs_call_with_error_handling(ctx.clone(), callback, (js_value,))?;

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
            let err_js_value = Exception::from_message(
                ctx.clone(),
                &format!("Rejection code {}, {}", (err.0 as i32).to_string(), err.1),
            )
            .into_js(&ctx)?;

            Ok((false, err_js_value))
        }
    }
}

fn get_callback<'a>(
    ctx: Ctx<'a>,
    promise_id: &str,
    should_resolve: bool,
) -> Result<Function<'a>, Box<dyn Error>> {
    let global_object = get_resolve_or_reject_global_object(ctx.clone(), should_resolve)?;
    let callback_name = get_resolve_or_reject_callback_name(&promise_id, should_resolve);

    Ok(global_object.get(callback_name)?)
}

fn get_resolve_or_reject_global_object(
    ctx: Ctx,
    should_resolve: bool,
) -> Result<Object, Box<dyn Error>> {
    let globals = ctx.globals();

    if should_resolve {
        Ok(globals.get("_azleResolveIds")?)
    } else {
        Ok(globals.get("_azleRejectIds")?)
    }
}

fn get_resolve_or_reject_callback_name(promise_id: &str, should_resolve: bool) -> String {
    if should_resolve {
        format!("_resolve_{promise_id}")
    } else {
        format!("_reject_{promise_id}")
    }
}
