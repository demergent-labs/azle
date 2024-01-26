// TODO basically copied into call_raw128

use wasmedge_quickjs::{AsObject, Context, JsFn, JsValue};

use crate::{run_event_loop, RUNTIME};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
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
        let payment: u64 = payment_string.parse().unwrap();

        ic_cdk::spawn(async move {
            let call_result =
                ic_cdk::api::call::call_raw(canister_id, &method, &args_raw, payment).await;

            RUNTIME.with(|runtime| {
                let mut runtime = runtime.borrow_mut();
                let runtime = runtime.as_mut().unwrap();

                runtime.run_with_context(|context| {
                    let global = context.get_global();

                    let (should_resolve, js_value) = match &call_result {
                        Ok(candid_bytes) => {
                            let candid_bytes_js_value: JsValue =
                                context.new_array_buffer(candid_bytes).into();

                            (true, candid_bytes_js_value)
                        }
                        Err(err) => {
                            let err_js_value: JsValue = context
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
                            .get("_azleResolveIds")
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
                            _ => run_event_loop(context),
                        };
                    } else {
                        let reject = global
                            .get("_azleRejectIds")
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
                            _ => run_event_loop(context),
                        };
                    }
                });
            });
        });

        JsValue::UnDefined
    }
}
