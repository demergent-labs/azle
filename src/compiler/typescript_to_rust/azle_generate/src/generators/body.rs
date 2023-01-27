use cdk_framework::nodes::{ActCanisterMethod, ActExternalCanister};
use proc_macro2::TokenStream;
use quote::quote;

use crate::{
    generators::{
        async_await_result_handler, boa_error_handlers, ic_object, rng_seed, stable_b_tree_map,
    },
    ts_ast::TsAst,
    StableBTreeMapNode,
};

pub fn generate(
    ts_ast: &TsAst,
    query_and_update_canister_methods: &Vec<ActCanisterMethod>,
    external_canisters: &Vec<ActExternalCanister>,
    stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>,
) -> TokenStream {
    let async_await_result_handler =
        async_await_result_handler::generate(query_and_update_canister_methods);
    let boa_error_handlers = boa_error_handlers::generate();
    let ic_object_functions = ic_object::functions::generate(
        query_and_update_canister_methods,
        external_canisters,
        stable_b_tree_map_nodes,
    );
    let register_ic_object_function = ic_object::register_function::generate(ts_ast);

    let stable_b_tree_maps = stable_b_tree_map::generate(stable_b_tree_map_nodes);
    let rng_seed = rng_seed::generate();

    quote! {
        #async_await_result_handler
        #boa_error_handlers
        #ic_object_functions
        #register_ic_object_function
        #stable_b_tree_maps
        #rng_seed
    }
}
