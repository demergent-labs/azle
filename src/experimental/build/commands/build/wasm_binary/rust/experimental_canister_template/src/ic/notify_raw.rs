use ic_cdk::call::{CallFailed, OnewayError};
use wasmedge_quickjs::{Context, JsFn, JsValue};

use crate::ic::call_raw::{CallErrorType, create_call_error};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, _this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let canister_id_bytes = if let JsValue::ArrayBuffer(js_array_buffer) = argv.get(0).unwrap()
        {
            js_array_buffer.to_vec()
        } else {
            panic!("conversion from JsValue to JsArrayBuffer failed")
        };
        let canister_id = candid::Principal::from_slice(&canister_id_bytes);

        let method = if let JsValue::String(js_string) = argv.get(1).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };

        let args_raw = if let JsValue::ArrayBuffer(js_array_buffer) = argv.get(2).unwrap() {
            js_array_buffer.to_vec()
        } else {
            panic!("conversion from JsValue to JsArrayBuffer failed")
        };

        let payment_string = if let JsValue::String(js_string) = argv.get(3).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };
        let payment: u128 = payment_string.parse().unwrap();

        let notify_result = ic_cdk::call::Call::unbounded_wait(canister_id, &method)
            .with_raw_args(&args_raw)
            .with_cycles(payment)
            .oneway();

        match notify_result {
            Ok(_) => JsValue::UnDefined,
            Err(oneway_error) => {
                let call_error = create_call_error(
                    context,
                    match oneway_error {
                        OnewayError::CallPerformFailed(call_perform_failed) => {
                            CallErrorType::CallFailed(CallFailed::CallPerformFailed(
                                call_perform_failed,
                            ))
                        }
                        OnewayError::InsufficientLiquidCycleBalance(
                            insufficient_liquid_cycle_balance,
                        ) => CallErrorType::CallFailed(CallFailed::InsufficientLiquidCycleBalance(
                            insufficient_liquid_cycle_balance,
                        )),
                    },
                )
                .unwrap();

                context.throw_error(call_error.into()).into()
            }
        }
    }
}
