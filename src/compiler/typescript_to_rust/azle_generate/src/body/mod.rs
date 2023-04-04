use cdk_framework::act::node::{
    candid::Service,
    canister_method::{QueryMethod, QueryOrUpdateMethod, UpdateMethod},
};
use proc_macro2::TokenStream;
use quote::quote;

use crate::ts_ast::TsAst;

use self::stable_b_tree_map::StableBTreeMapNode;

mod ic_object;

pub mod stable_b_tree_map;
pub mod utils;

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

    let utils = utils::generate(&query_and_update_methods);
    let ic_object_module = ic_object::generate_module(
        ts_ast,
        &query_and_update_methods,
        services,
        &stable_b_tree_map_nodes,
    );

    let stable_b_tree_maps = stable_b_tree_map::rust::generate(&stable_b_tree_map_nodes);

    quote! {
        #utils
        #ic_object_module
        #stable_b_tree_maps
    }
}
