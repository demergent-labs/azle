use cdk_framework::nodes::{ActExternalCanister, ActExternalCanisterMethod};
use proc_macro2::TokenStream;
use quote::{format_ident, quote};

use crate::generators::ic_object;

pub fn generate(
    canister: &ActExternalCanister,
    method: &ActExternalCanisterMethod,
    pre_await_state_management: &TokenStream,
    post_await_state_management: &TokenStream,
    promise_fulfillment: &TokenStream,
) -> TokenStream {
    let call_function_name_string = format!("_azle_call_{}_{}", canister.name, method.name);
    let call_function_name_ident = format_ident!("{}", call_function_name_string);
    let call_wrapper_fn_name = format_ident!("{}_wrapper", call_function_name_string);
    let param_variables = ic_object::generate_param_variables(method);
    let args = ic_object::generate_args_list(method);

    quote! {
        fn #call_wrapper_fn_name(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let canister_id_js_value = _aargs.get(0).unwrap().clone();
            let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.try_from_vm_value(&mut *_context).unwrap();

            let args_js_value = _aargs.get(1).unwrap().clone();
            let args_js_object = args_js_value.as_object().unwrap();

            #(#param_variables)*

            // TODO make this promise in a better way once Boa allows it or you can figure it out
            let promise_js_value = _context.eval("new Promise(() => {})").unwrap();
            let promise_js_value_cloned = promise_js_value.clone();

            ic_cdk::spawn(async move {
                #pre_await_state_management

                let call_result = #call_function_name_ident(
                    canister_id_principal,
                    #args
                ).await;

                #post_await_state_management

                #promise_fulfillment
            });

            Ok(promise_js_value_cloned)
        }
    }
}
