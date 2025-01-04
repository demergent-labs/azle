use wasmedge_quickjs::{AsObject, Context, JsFn, JsValue};

use crate::run_event_loop;

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, _this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let promise_id = if let JsValue::String(js_string) = argv.get(0).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };

        let canister_id_bytes = if let JsValue::ArrayBuffer(js_array_buffer) = argv.get(1).unwrap()
        {
            js_array_buffer.to_vec()
        } else {
            panic!("conversion from JsValue to JsArrayBuffer failed")
        };
        let canister_id = candid::Principal::from_slice(&canister_id_bytes);

        let method = if let JsValue::String(js_string) = argv.get(2).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };

        let args_raw = if let JsValue::ArrayBuffer(js_array_buffer) = argv.get(3).unwrap() {
            js_array_buffer.to_vec()
        } else {
            panic!("conversion from JsValue to JsArrayBuffer failed")
        };

        let payment_string = if let JsValue::String(js_string) = argv.get(4).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };
        let payment: u128 = payment_string.parse().unwrap();

        let mut context_clone = context.clone();

        ic_cdk::spawn(async move {
            let mut context_clone_cleanup = context_clone.clone();

            // My understanding of how this works
            // scopeguard will execute its closure at the end of the scope
            // After a successful or unsuccessful cross-canister call (await point)
            // the closure will run, cleaning up the global promise callbacks
            // Even during a trap, the IC will ensure that the closure runs in its own call
            // thus allowing us to recover from a trap and persist that state
            let _cleanup = scopeguard::guard((), |_| {
                let global = context_clone_cleanup.get_global();

                let reject_id = format!("_reject_{}", promise_id);
                let resolve_id = format!("_resolve_{}", promise_id);

                let reject_callbacks = global.get("_azleRejectCallbacks");
                let resolve_callbacks = global.get("_azleResolveCallbacks");

                reject_callbacks.to_obj().unwrap().delete(&reject_id);
                resolve_callbacks.to_obj().unwrap().delete(&resolve_id);
            });

            let call_result =
                ic_cdk::api::call::call_raw128(canister_id, &method, &args_raw, payment).await;

            let global = context_clone.get_global();

            let (should_resolve, js_value) = match &call_result {
                Ok(candid_bytes) => {
                    let candid_bytes_js_value: JsValue =
                        context_clone.new_array_buffer(candid_bytes).into();

                    (true, candid_bytes_js_value)
                }
                Err(err) => {
                    let err_js_value: JsValue = context_clone
                        .new_error(&format!(
                            "Rejection code {rejection_code}, {error_message}",
                            rejection_code = (err.0 as i32).to_string(),
                            error_message = err.1
                        ))
                        .into();

                    (false, err_js_value)
                }
            };

            if should_resolve {
                let resolve = global
                    .get("_azleResolveCallbacks")
                    .to_obj()
                    .unwrap()
                    .get(format!("_resolve_{promise_id}").as_str())
                    .to_function()
                    .unwrap();

                let result = resolve.call(&[js_value.clone()]);

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
                let reject = global
                    .get("_azleRejectCallbacks")
                    .to_obj()
                    .unwrap()
                    .get(format!("_reject_{promise_id}").as_str())
                    .to_function()
                    .unwrap();

                let result = reject.call(&[js_value.clone()]);

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

        JsValue::UnDefined
    }
}
