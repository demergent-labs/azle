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

                execute_in_context(move |ctx| {
                    let (should_resolve, js_value) =
                        prepare_final_js_value(ctx.clone(), &call_result);
                    let resolve_or_reject =
                        get_resolve_or_reject_object(ctx.clone(), should_resolve);
                    let function_name = get_function_name(&promise_id, should_resolve);
                    let callback = get_callback(resolve_or_reject, &function_name);
                    execute_callback(callback, js_value);
                    run_event_loop(ctx.clone());
                });
            });

            rquickjs::Undefined
        },
    )
    .unwrap()
}

fn execute_in_context<F>(f: F)
where
    F: FnOnce(Ctx) + 'static,
{
    CONTEXT.with(|context| {
        let context = context.borrow();
        let context = context.as_ref().unwrap();
        context.with(f);
    });
}

// TODO get rid of lifetimes if possible
fn prepare_final_js_value<'a>(
    ctx: Ctx<'a>,
    call_result: &Result<Vec<u8>, (ic_cdk::api::call::RejectionCode, String)>,
) -> (bool, rquickjs::Value<'a>) {
    match call_result {
        Ok(candid_bytes) => {
            let candid_bytes_js_value = TypedArray::<u8>::new(ctx.clone(), candid_bytes.clone())
                .into_js(&ctx)
                .unwrap();
            (true, candid_bytes_js_value)
        }
        Err(err) => {
            let err_js_value = Exception::from_message(
                ctx.clone(),
                &format!("Rejection code {}, {}", (err.0 as i32).to_string(), err.1),
            )
            .into_js(&ctx)
            .unwrap();
            (false, err_js_value)
        }
    }
}

fn get_resolve_or_reject_object(ctx: Ctx, should_resolve: bool) -> rquickjs::Object {
    let global = ctx.globals();
    if should_resolve {
        global
            .get::<_, rquickjs::Object>("_azleResolveIds")
            .unwrap()
    } else {
        global.get::<_, rquickjs::Object>("_azleRejectIds").unwrap()
    }
}

fn get_function_name(promise_id: &str, should_resolve: bool) -> String {
    if should_resolve {
        format!("_resolve_{promise_id}")
    } else {
        format!("_reject_{promise_id}")
    }
}

fn get_callback<'a>(
    resolve_or_reject: rquickjs::Object<'a>,
    function_name: &str,
) -> rquickjs::Function<'a> {
    resolve_or_reject.get(function_name).unwrap()
}

fn execute_callback<'a>(callback: rquickjs::Function<'a>, js_value: rquickjs::Value<'a>) {
    callback
        .call::<_, rquickjs::Undefined>((js_value,))
        .unwrap();
}
