use super::async_call::{
    post_await_state_management, pre_await_state_management, promise_fulfillment,
};

pub fn generate() -> proc_macro2::TokenStream {
    let pre_await_state_management = pre_await_state_management::generate();
    let post_await_state_management = post_await_state_management::generate();
    let promise_fulfillment = promise_fulfillment::generate();

    quote::quote! {
        fn call_raw128(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let (js_promise, js_promise_resolvers) = boa_engine::object::builtins::JsPromise::new_pending(context);

            let canister_id: ic_cdk::export::Principal = aargs.get(0).unwrap().clone().try_from_vm_value(&mut *context).unwrap();
            let method: String = aargs.get(1).unwrap().clone().try_from_vm_value(&mut *context).unwrap();
            let args_raw: Vec<u8> = aargs.get(2).unwrap().clone().try_from_vm_value(&mut *context).unwrap();
            let payment: u128 = aargs.get(3).unwrap().clone().try_from_vm_value(&mut *context).unwrap();

            ic_cdk::spawn(async move {
                #pre_await_state_management

                let call_result = ic_cdk::api::call::call_raw128(
                    canister_id,
                    &method,
                    &args_raw,
                    payment
                ).await;

                #post_await_state_management

                #promise_fulfillment
            });

            Ok(js_promise.into())
        }
    }
}
