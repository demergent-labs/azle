use cdk_framework::act::node::{
    candid::Service,
    canister_method::{QueryMethod, QueryOrUpdateMethod, UpdateMethod},
};
use proc_macro2::TokenStream;
use quote::quote;

use crate::{
    generators::{async_await_result_handler, boa_error_handlers, ic_object, stable_b_tree_map},
    ts_ast::TsAst,
    StableBTreeMapNode,
};

pub fn generate(
    ts_ast: &TsAst,
    query_methods: &Vec<QueryMethod>,
    update_methods: &Vec<UpdateMethod>,
    services: &Vec<Service>,
    stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>,
) -> TokenStream {
    let query_and_update_methods = vec![
        query_methods
            .iter()
            .map(|query_method| QueryOrUpdateMethod::Query(query_method.clone()))
            .collect::<Vec<_>>(),
        update_methods
            .iter()
            .map(|update_methods| QueryOrUpdateMethod::Update(update_methods.clone()))
            .collect::<Vec<_>>(),
    ]
    .concat();

    let async_await_result_handler =
        async_await_result_handler::generate(&query_and_update_methods);
    let boa_error_handlers = boa_error_handlers::generate();
    let ic_object_functions = ic_object::functions::generate(
        &query_and_update_methods,
        services,
        stable_b_tree_map_nodes,
    );
    let register_ic_object_function = ic_object::register_function::generate(ts_ast);

    let stable_b_tree_maps = stable_b_tree_map::generate(stable_b_tree_map_nodes);

    quote! {
        #async_await_result_handler
        #boa_error_handlers
        #ic_object_functions
        #register_ic_object_function
        #stable_b_tree_maps
    }
}
