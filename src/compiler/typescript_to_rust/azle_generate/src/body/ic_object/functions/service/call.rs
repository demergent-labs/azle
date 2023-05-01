use cdk_framework::act::node::candid::{service::Method, Service};
use proc_macro2::TokenStream;
use quote::{format_ident, quote};

pub fn generate(
    service: &Service,
    method: &Method,
    pre_await_state_management: &TokenStream,
    post_await_state_management: &TokenStream,
    promise_fulfillment: &TokenStream,
) -> TokenStream {
    let call_function_name_string = format!("call_{}_{}", service.name, method.name);
    let call_function_name_ident = format_ident!("{}", call_function_name_string);
    let call_wrapper_fn_name = format_ident!("{}_wrapper", call_function_name_string);
    let param_variables = super::generate_param_variables(method, &service.name);
    let args = super::generate_args_list(method);

    quote! {
        fn #call_wrapper_fn_name(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let canister_id_js_value = aargs.get(0).unwrap().clone();
            let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.try_from_vm_value(&mut *context).unwrap();

            let args_js_value = aargs.get(1).unwrap().clone();
            let args_js_object = args_js_value.as_object().unwrap();

            #(#param_variables)*

            let (js_promise, js_promise_resolvers) = boa_engine::object::builtins::JsPromise::new_pending(context);

            ic_cdk::spawn(async move {
                #pre_await_state_management

                let call_result = #call_function_name_ident(
                    canister_id_principal,
                    #args
                ).await;

                #post_await_state_management

                #promise_fulfillment
            });

            Ok(js_promise.clone().into())
        }
    }
}
