use cdk_framework::{nodes::ActExternalCanister, ActCanisterMethod};
use proc_macro2::TokenStream;
use quote::quote;

use crate::{
    generators::{async_result_handler, errors, ic_object, stable_b_tree_map},
    ts_ast::TsAst,
};

pub fn generate_azle_specific_code(
    ts_ast: &TsAst,
    query_and_update_canister_methods: Vec<ActCanisterMethod>,
    external_canisters: &Vec<ActExternalCanister>,
) -> TokenStream {
    let async_result_handler =
        async_result_handler::generate_async_result_handler(&query_and_update_canister_methods);
    let boa_error_handlers = errors::generate_boa_error_handlers();
    let stable_b_tree_map_nodes = ts_ast.stable_b_tree_map_nodes();
    let ic_object_functions = ic_object::functions::generate_functions(
        &query_and_update_canister_methods,
        &external_canisters,
        &stable_b_tree_map_nodes,
    );
    let register_ic_object_function = ic_object::generate_register_ic_object_function(ts_ast);

    let stable_b_tree_maps =
        stable_b_tree_map::generate_stable_b_tree_maps(&stable_b_tree_map_nodes);

    quote! {
        #async_result_handler
        #boa_error_handlers
        #ic_object_functions
        #register_ic_object_function
        #stable_b_tree_maps
    }
}
