use super::async_call::{
    post_await_state_management, pre_await_state_management, promise_fulfillment,
};

pub fn generate() -> proc_macro2::TokenStream {
    let pre_await_state_management = pre_await_state_management::generate();
    let post_await_state_management = post_await_state_management::generate();
    let promise_fulfillment = promise_fulfillment::generate();

    quote::quote! {
        fn call_raw(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let (js_promise, js_promise_resolvers) =
                boa_engine::object::builtins::JsPromise::new_pending(context);

            let canister_id_js_value = aargs
                .get(0)
                .ok_or_else(|| "An argument for 'canisterId' was not provided".to_js_error(None))?
                .clone();
            let method_js_value = aargs
                .get(1)
                .ok_or_else(|| "An argument for 'method' was not provided".to_js_error(None))?
                .clone();
            let args_raw_js_value = aargs
                .get(2)
                .ok_or_else(|| "An argument for 'argsRaw' was not provided".to_js_error(None))?
                .clone();
            let payment_js_value = aargs
                .get(3)
                .ok_or_else(|| "An argument for 'payment' was not provided".to_js_error(None))?
                .clone();

            let canister_id: candid::Principal = canister_id_js_value
                .try_from_vm_value(&mut *context)?;
            let method: String = method_js_value.try_from_vm_value(&mut *context)?;
            let args_raw: Vec<u8> = args_raw_js_value.try_from_vm_value(&mut *context)?;
            let payment: u64 = payment_js_value.try_from_vm_value(&mut *context)?;

            ic_cdk::spawn(async move {
                #pre_await_state_management

                let call_result =
                    ic_cdk::api::call::call_raw(canister_id, &method, &args_raw, payment).await;

                #post_await_state_management

                #promise_fulfillment
            });

            Ok(js_promise.into())
        }
    }
}
