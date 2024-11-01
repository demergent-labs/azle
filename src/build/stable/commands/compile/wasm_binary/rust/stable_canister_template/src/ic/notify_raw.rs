use candid::Principal;
use ic_cdk::api::call::notify_raw;
use rquickjs::{Ctx, Exception, Function, IntoJs, Result, TypedArray, Undefined, Value};

use crate::ic::throw_error;

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

            let notify_result = notify_raw(canister_id, &method, &args_raw, payment);

            match notify_result {
                Ok(_) => Undefined.into_js(&ctx),
                Err(err) => {
                    let err_string = format!(
                        "Rejection code {rejection_code}",
                        rejection_code = (err as i32).to_string()
                    );
                    let err_js_value =
                        Exception::from_message(ctx.clone(), &err_string).into_js(&ctx)?;

                    Ok(err_js_value)
                }
            }
        },
    )
}
