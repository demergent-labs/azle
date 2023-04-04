use cdk_framework::act::node::{candid::Service, canister_method::QueryOrUpdateMethod};
use proc_macro2::TokenStream;
use quote::quote;

use crate::ts_ast::TsAst;

use super::stable_b_tree_map::StableBTreeMapNode;

pub mod functions;
pub mod register_function;

pub fn generate_module(
    ts_ast: &TsAst,
    query_and_update_methods: &Vec<QueryOrUpdateMethod>,
    services: &Vec<Service>,
    stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>,
) -> TokenStream {
    let ic_object_functions = functions::generate(
        &query_and_update_methods,
        services,
        &stable_b_tree_map_nodes,
    );
    let register_ic_object_function = register_function::generate(ts_ast);

    quote! {
        pub mod ic_object {
            use ic_cdk::api::call::CallResult;
            use crate::vm_value_conversion::{CdkActTryFromVmValue, CdkActTryIntoVmValue};
            use crate::OrTrap;
            #ic_object_functions
            #register_ic_object_function
        }
    }
}
