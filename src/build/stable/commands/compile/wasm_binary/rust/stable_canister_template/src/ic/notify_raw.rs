use rquickjs::{Ctx, Function, IntoJs, TypedArray};

pub fn get_function(ctx: Ctx) -> Function {
    Function::new(
        ctx.clone(),
        move |canister_id_bytes: TypedArray<u8>,
              method: String,
              args_raw: TypedArray<u8>,
              payment_string: String| {
            let canister_id = candid::Principal::from_slice(canister_id_bytes.as_ref());
            let args_raw = args_raw.as_bytes().unwrap().to_vec();
            let payment: u128 = payment_string.parse().unwrap();

            let notify_result =
                ic_cdk::api::call::notify_raw(canister_id, &method, &args_raw, payment);

            match notify_result {
                Ok(_) => rquickjs::Undefined.into_js(&ctx).unwrap(),
                Err(err) => {
                    let err_string = format!(
                        "Rejection code {rejection_code}",
                        rejection_code = (err as i32).to_string()
                    );
                    let err_js_value = rquickjs::Exception::from_message(ctx.clone(), &err_string)
                        .into_js(&ctx)
                        .unwrap();

                    err_js_value
                }
            }
        },
    )
    .unwrap()
}
