use cdk_framework::act::node::candid::Service;
use cdk_framework::act::{
    node::{candid::service::Method, Context},
    ToTypeAnnotation,
};
use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote};

use super::async_call::{
    post_await_state_management, pre_await_state_management, promise_fulfillment,
};
use crate::ts_keywords;

mod call;
mod call_with_payment;
mod call_with_payment128;
mod notify;
mod notify_with_payment128;

pub fn generate(services: &Vec<Service>) -> Vec<TokenStream> {
    services
        .iter()
        .map(|service| {
            service
                .methods
                .iter()
                .map(|method| {
                    let pre_await_state_management = pre_await_state_management::generate();
                    let post_await_state_management = post_await_state_management::generate();
                    let promise_fulfillment = promise_fulfillment::generate();

                    let call_function = call::generate(
                        service,
                        method,
                        &pre_await_state_management,
                        &post_await_state_management,
                        &promise_fulfillment,
                    );
                    let call_with_payment_function = call_with_payment::generate(
                        service,
                        method,
                        &pre_await_state_management,
                        &post_await_state_management,
                        &promise_fulfillment,
                    );
                    let call_with_payment128_function = call_with_payment128::generate(
                        service,
                        method,
                        &pre_await_state_management,
                        &post_await_state_management,
                        &promise_fulfillment,
                    );
                    let notify_function = notify::generate(service, method);
                    let notify_with_payment128_function =
                        notify_with_payment128::generate(service, method);

                    quote! {
                        #call_function
                        #call_with_payment_function
                        #call_with_payment128_function
                        #notify_function
                        #notify_with_payment128_function
                    }
                })
                .collect()
        })
        .collect::<Vec<Vec<TokenStream>>>()
        .concat()
}

pub fn generate_param_variables(method: &Method, canister_name: &String) -> Vec<TokenStream> {
    method.params
        .iter()
        .enumerate()
        .map(|(index, param)| {
            let param_name_js_value = format_ident!("{}_js_value", &param.get_prefixed_name());
            let param_name = format_ident!("{}", &param.get_prefixed_name());
            let param_type = param.to_type_annotation(&Context {
                keyword_list: ts_keywords::ts_keywords(),
                cdk_name: "azle".to_string(),
            }, method.create_qualified_name(canister_name));

            quote! {
                let #param_name_js_value = args_js_object.get(#index, context).unwrap();
                let #param_name: #param_type = #param_name_js_value.try_from_vm_value(&mut *context).unwrap();
            }
        })
    .collect()
}

pub fn generate_args_list(method: &Method) -> TokenStream {
    let param_names: Vec<Ident> = method
        .params
        .iter()
        .map(|param| format_ident!("{}", &param.get_prefixed_name()))
        .collect();

    let comma = if param_names.len() == 1 {
        quote! { , }
    } else {
        quote! {}
    };
    return quote! { (#(#param_names),*#comma) };
}
