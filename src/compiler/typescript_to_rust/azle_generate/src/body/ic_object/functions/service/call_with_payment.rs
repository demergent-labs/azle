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
    let call_with_payment_function_name_string =
        format!("call_with_payment_{}_{}", service.name, method.name);
    let call_with_payment_function_name_ident =
        format_ident!("_azle_{}", call_with_payment_function_name_string);
    let call_with_payment_wrapper_fn_name =
        format_ident!("{}_wrapper", call_with_payment_function_name_string);
    let param_variables = super::generate_param_variables(method, &service.name);
    let args = super::generate_args_list(method);

    let index_string = param_variables.len().to_string();

    quote! {
        fn #call_with_payment_wrapper_fn_name(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let canister_id_js_value = _aargs.get(0).unwrap().clone();
            let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.try_from_vm_value(&mut *_context).unwrap();

            let args_js_value = _aargs.get(1).unwrap().clone();
            let args_js_object = args_js_value.as_object().unwrap();

            #(#param_variables)*

            let cycles_js_value = args_js_object.get(#index_string, _context).unwrap();
            let cycles: u64 = cycles_js_value.try_from_vm_value(&mut *_context).unwrap();

            // TODO make this promise in a better way once Boa allows it or you can figure it out
            let promise_js_value = _context.eval("new Promise(() => {})").unwrap();
            let promise_js_value_cloned = promise_js_value.clone();

            ic_cdk::spawn(async move {
                #pre_await_state_management

                let call_result = crate::#call_with_payment_function_name_ident(
                    canister_id_principal,
                    #args,
                    cycles
                ).await;

                #post_await_state_management

                #promise_fulfillment
            });

            Ok(promise_js_value_cloned)
        }
    }
}
