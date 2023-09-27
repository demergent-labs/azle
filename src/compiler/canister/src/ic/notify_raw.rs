use std::convert::TryInto;

// TODO basically copied from call_raw128
use quickjs_wasm_rs::{CallbackArg, JSContextRef, JSValueRef};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let canister_id_bytes: Vec<u8> = args
        .get(0)
        .expect("notify_raw canister_id_bytes is undefined")
        .to_js_value()?
        .try_into()?;
    let canister_id = candid::Principal::from_slice(&canister_id_bytes);
    let method: String = args
        .get(1)
        .expect("notify_raw method argument is undefined")
        .to_js_value()?
        .try_into()?;
    let args_raw: Vec<u8> = args
        .get(2)
        .expect("notify_raw args_raw argument is undefined")
        .to_js_value()?
        .try_into()?;
    let payment_candid_bytes: Vec<u8> = args
        .get(3)
        .expect("notify_raw payment_candid_bytes argument is undefined")
        .to_js_value()?
        .try_into()?;
    let payment: u128 = candid::decode_one(&payment_candid_bytes)?;

    let notify_result = ic_cdk::api::call::notify_raw(canister_id, &method, &args_raw, payment);

    match notify_result {
        Ok(_) => context.undefined_value(),
        Err(err) => {
            // TODO it might be nice to convert the rejection code to a string as well if possible
            // TODO to give the user an actual error message (like the enum variants converted to string)
            let err_string = format!(
                "Rejection code {rejection_code}",
                rejection_code = (err as i32).to_string()
            );

            Err(anyhow::anyhow!(err_string))
        }
    }
}
