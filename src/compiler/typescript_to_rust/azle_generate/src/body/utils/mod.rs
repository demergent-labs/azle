use cdk_framework::act::node::canister_method::QueryOrUpdateMethod;
use proc_macro2::TokenStream;
use quote::quote;

mod async_await_result_handler;
mod boa_error_handlers;
mod global_js_function_trait;

pub fn generate(query_and_update_methods: &Vec<QueryOrUpdateMethod>) -> TokenStream {
    let async_await_result_handler =
        async_await_result_handler::generate(&query_and_update_methods);
    let boa_error_handlers = boa_error_handlers::generate();
    let global_js_function_trait = global_js_function_trait::generate();

    quote! {
        #async_await_result_handler
        #boa_error_handlers
        #global_js_function_trait
    }
}
