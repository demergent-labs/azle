use crate::generators::cross_canister_calls::{
    post_await_state_management, pre_await_state_management, promise_fulfillment,
};
use cdk_framework::nodes::ActExternalCanister;
use proc_macro2::TokenStream;
use quote::quote;

mod call;
mod call_with_payment;
mod call_with_payment128;

pub fn generate(external_canisters: &Vec<ActExternalCanister>) -> Vec<TokenStream> {
    external_canisters
        .iter()
        .map(|canister| {
            canister
                .methods
                .iter()
                .map(|method| {
                    let pre_await_state_management = pre_await_state_management::generate();
                    let post_await_state_management = post_await_state_management::generate();
                    let promise_fulfillment = promise_fulfillment::generate();

                    let call_function = call::generate(
                        canister,
                        method,
                        &pre_await_state_management,
                        &post_await_state_management,
                        &promise_fulfillment,
                    );
                    let call_with_payment_function = call_with_payment::generate(
                        canister,
                        method,
                        &pre_await_state_management,
                        &post_await_state_management,
                        &promise_fulfillment,
                    );
                    let call_with_payment128_function = call_with_payment128::generate(
                        canister,
                        method,
                        &pre_await_state_management,
                        &post_await_state_management,
                        &promise_fulfillment,
                    );

                    quote! {
                        #call_function
                        #call_with_payment_function
                        #call_with_payment128_function
                    }
                })
                .collect()
        })
        .collect::<Vec<Vec<TokenStream>>>()
        .concat()
}
