use crate::{run_event_loop, CONTEXT};
use rquickjs::{Ctx, Exception, Function, IntoJs, TypedArray};

pub fn get_function(ctx: Ctx) -> Function {
    Function::new(
        ctx,
        |promise_id: String,
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

                quickjs_with_ctx(move |ctx| {
                    resolve_or_reject(ctx.clone(), &call_result, &promise_id);
                    run_event_loop(ctx.clone());
                });
            });

            rquickjs::Undefined
        },
    )
    .unwrap()
}

fn quickjs_with_ctx<F>(f: F)
where
    F: FnOnce(Ctx) + 'static,
{
    CONTEXT.with(|context| {
        let context = context.borrow();
        let context = context.as_ref().unwrap();
        context.with(f);
    });
}

fn resolve_or_reject<'a>(
    ctx: Ctx<'a>,
    call_result: &Result<Vec<u8>, (ic_cdk::api::call::RejectionCode, String)>,
    promise_id: &str,
) {
    let (should_resolve, js_value) = prepare_js_value(ctx.clone(), &call_result);
    let callback = get_callback(ctx.clone(), &promise_id, should_resolve);

    callback
        .call::<_, rquickjs::Undefined>((js_value,))
        .unwrap();
}

fn prepare_js_value<'a>(
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

fn get_callback<'a>(
    ctx: Ctx<'a>,
    promise_id: &str,
    should_resolve: bool,
) -> rquickjs::Function<'a> {
    let global_object = get_resolve_or_reject_global_object(ctx.clone(), should_resolve);
    let callback_name = get_resolve_or_reject_callback_name(&promise_id, should_resolve);

    global_object.get(callback_name).unwrap()
}

fn get_resolve_or_reject_global_object(ctx: Ctx, should_resolve: bool) -> rquickjs::Object {
    let global = ctx.globals();
    if should_resolve {
        global.get("_azleResolveIds").unwrap()
    } else {
        global.get("_azleRejectIds").unwrap()
    }
}

fn get_resolve_or_reject_callback_name(promise_id: &str, should_resolve: bool) -> String {
    if should_resolve {
        format!("_resolve_{promise_id}")
    } else {
        format!("_reject_{promise_id}")
    }
}
