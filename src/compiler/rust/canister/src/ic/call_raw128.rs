// TODO basically copied from call_raw
use std::convert::TryInto;

use quickjs_wasm_rs::{to_qjs_value, CallbackArg, JSContextRef, JSValue, JSValueRef};

use crate::CONTEXT;

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let promise_id: String = args
        .get(0)
        .expect("call_raw promise_id argument is undefined")
        .to_js_value()?
        .try_into()?;
    let canister_id_bytes: Vec<u8> = args
        .get(1)
        .expect("call_raw canister_id_bytes is undefined")
        .to_js_value()?
        .try_into()?;
    let canister_id = candid::Principal::from_slice(&canister_id_bytes);
    let method: String = args
        .get(2)
        .expect("call_raw method argument is undefined")
        .to_js_value()?
        .try_into()?;
    let args_raw: Vec<u8> = args
        .get(3)
        .expect("call_raw args_raw argument is undefined")
        .to_js_value()?
        .try_into()?;
    let payment_candid_bytes: Vec<u8> = args
        .get(4)
        .expect("call_raw payment_candid_bytes argument is undefined")
        .to_js_value()?
        .try_into()?;
    let payment: u128 = candid::decode_one(&payment_candid_bytes)?;

    ic_cdk::spawn(async move {
        let call_result =
            ic_cdk::api::call::call_raw128(canister_id, &method, &args_raw, payment).await;

        let (should_resolve, js_value) = match call_result {
            Ok(candid_bytes) => {
                let candid_bytes_js_value: JSValue = candid_bytes.into();
                (true, candid_bytes_js_value)
            }
            Err(err) => {
                let err_js_value: JSValue = format!(
                    "Rejection code {rejection_code}, {error_message}",
                    rejection_code = (err.0 as i32).to_string(),
                    error_message = err.1
                )
                .into();

                (false, err_js_value)
            }
        };

        CONTEXT.with(|context| {
            let mut context = context.borrow_mut();
            let context = context.as_mut().unwrap();

            let global = context.global_object().unwrap();

            let js_value_ref = to_qjs_value(&context, &js_value).unwrap();

            if should_resolve {
                let resolve = global
                    .get_property("_azleResolveIds").unwrap()
                    .get_property(format!("_resolve_{promise_id}").as_str())
                    .unwrap();
                resolve.call(&resolve, &[js_value_ref]).unwrap();
            } else {
                let reject = global
                    .get_property("_azleRejectIds").unwrap()
                    .get_property(format!("_reject_{promise_id}").as_str())
                    .unwrap();
                reject.call(&reject, &[js_value_ref]).unwrap();
            }

            context.execute_pending().unwrap();
        });
    });

    context.undefined_value()
}
