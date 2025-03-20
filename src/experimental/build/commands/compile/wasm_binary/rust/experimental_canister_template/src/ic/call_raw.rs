use wasmedge_quickjs::{AsObject, Context, JsFn, JsValue};

use crate::run_event_loop;

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

        let mut context_clone = context.clone();

        let (promise, resolve, reject) = context.new_promise();

        let resolve_function = resolve.to_function().unwrap();
        let reject_function = reject.to_function().unwrap();

        ic_cdk::spawn(async move {
            let call_result =
                ic_cdk::api::call::call_raw128(canister_id, &method, &args_raw, payment).await;

            let (should_resolve, js_value) = match &call_result {
                Ok(candid_bytes) => {
                    let candid_bytes_js_value: JsValue =
                        context_clone.new_array_buffer(candid_bytes).into();

                    (true, candid_bytes_js_value)
                }
                Err(err) => {
                    let mut err_object = context_clone
                        .new_error(&format!(
                            "The inter-canister call failed with reject code {}: {}",
                            err.0 as i32, err.1
                        ))
                        .to_obj()
                        .unwrap();

                    err_object.set("rejectCode", (err.0 as i32).into());
                    err_object.set("rejectMessage", context_clone.new_string(&err.1).into());

                    (false, err_object.into())
                }
            };

            if should_resolve {
                let result = resolve_function.call(&[js_value.clone()]);

                // TODO error handling is mostly done in JS right now
                // TODO we would really like wasmedge-quickjs to add
                // TODO good error info to JsException and move error handling
                // TODO out of our own code
                match &result {
                    wasmedge_quickjs::JsValue::Exception(js_exception) => {
                        js_exception.dump_error();
                        panic!("TODO needs error info");
                    }
                    _ => run_event_loop(&mut context_clone),
                };
            } else {
                let result = reject_function.call(&[js_value.clone()]);

                // TODO error handling is mostly done in JS right now
                // TODO we would really like wasmedge-quickjs to add
                // TODO good error info to JsException and move error handling
                // TODO out of our own code
                match &result {
                    wasmedge_quickjs::JsValue::Exception(js_exception) => {
                        js_exception.dump_error();
                        panic!("TODO needs error info");
                    }
                    _ => run_event_loop(&mut context_clone),
                };
            }
        });

        promise
    }
}
