use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn call_raw<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            _args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            // let resolve = to_qjs_value(&context, &_args.get(0).expect("candidDecode parameter 0 must be the resolve function").to_js_value()?)?;
            let resolveId: String = _args.get(2).expect("candidDecode must have at least one argument").to_js_value()?.try_into()?;
            let candid_encoded: Vec<u8> = _args.get(5).expect("candidDecode must have at least one argument").to_js_value()?.try_into()?;

            // let args_cloned = _args.to_vec();

            ic_cdk::spawn(async move {
                let call_result = ic_cdk::api::call::call_raw(candid::Principal::management_canister(), "raw_rand", &candid_encoded, 0).await;

                let candid_bytes_js_value: JSValue = call_result.unwrap().into();

                CONTEXT.with(|context| {
                    let mut context = context.borrow_mut();
                    let context = context.as_mut().unwrap();

                    let candid_bytes_js_value_ref = to_qjs_value(&context, &candid_bytes_js_value).unwrap();

                    // let resolve = to_qjs_value(&context, &args_cloned.get(0).expect("candidDecode parameter 0 must be the resolve function").to_js_value().unwrap()).unwrap();
                    // let resolve = to_qjs_value(&context, &resolve_js_value).unwrap();

                    let global = context.global_object().unwrap();
                    let resolve = global.get_property(format!("_resolve_{resolveId}").as_str()).unwrap();

                    resolve.call(&resolve, &[candid_bytes_js_value_ref]).unwrap();

                    context.execute_pending().unwrap();
                });
            });

            context.undefined_value()
        }
    }
}
