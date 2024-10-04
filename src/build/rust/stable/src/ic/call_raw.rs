// TODO let's simplify this and make it more declarative
// TODO let's declaratize access to the javascript runtime

use crate::{run_event_loop, CONTEXT};
use rquickjs::{Ctx, Exception, Function, IntoJs, TypedArray};

pub fn get_function(context: Ctx) -> Function {
    Function::new(
        context.clone(),
        move |promise_id: String,
              canister_id_bytes: TypedArray<u8>,
              method: String,
              args_raw: TypedArray<u8>,
              payment_string: String| {
            let canister_id = candid::Principal::from_slice(canister_id_bytes.as_ref());
            let args_raw = args_raw.as_bytes().unwrap().to_vec();
            let payment: u128 = payment_string.parse().unwrap();

            ic_cdk::spawn(async move {
                let call_result =
                    ic_cdk::api::call::call_raw128(canister_id, &method, args_raw, payment).await;

                CONTEXT.with(|context| {
                    let context = context.borrow();
                    let context = context.as_ref().unwrap();

                    context.with(|ctx| {
                        let global = ctx.globals();

                        let (should_resolve, js_value) = match &call_result {
                            Ok(candid_bytes) => {
                                ic_cdk::println!("successful");

                                let candid_bytes_js_value =
                                    TypedArray::<u8>::new(ctx.clone(), candid_bytes.clone())
                                        .into_js(&ctx)
                                        .unwrap();
                                (true, candid_bytes_js_value)
                            }
                            Err(err) => {
                                let err_js_value = Exception::from_message(
                                    ctx.clone(),
                                    &format!(
                                        "Rejection code {}, {}",
                                        (err.0 as i32).to_string(),
                                        err.1
                                    ),
                                )
                                .into_js(&ctx)
                                .unwrap();

                                (false, err_js_value)
                            }
                        };

                        ic_cdk::println!("0");

                        let resolve_or_reject = if should_resolve {
                            global
                                .get::<_, rquickjs::Object>("_azleResolveIds")
                                .unwrap()
                        } else {
                            global.get::<_, rquickjs::Object>("_azleRejectIds").unwrap()
                        };

                        ic_cdk::println!("1");

                        let function_name = if should_resolve {
                            format!("_resolve_{promise_id}")
                        } else {
                            format!("_reject_{promise_id}")
                        };

                        ic_cdk::println!("2");

                        let callback: rquickjs::Function =
                            resolve_or_reject.get(function_name).unwrap();

                        ic_cdk::println!("3");

                        callback
                            .call::<_, rquickjs::Undefined>((js_value,))
                            .unwrap();

                        run_event_loop(ctx.clone());
                    });
                });
            });

            rquickjs::Undefined
        },
    )
    .unwrap()
}
