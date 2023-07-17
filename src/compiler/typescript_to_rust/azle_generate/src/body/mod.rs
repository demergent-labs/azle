use cdk_framework::{
    act::node::{
        candid::Service,
        canister_method::{QueryMethod, QueryOrUpdateMethod, UpdateMethod},
    },
    traits::CollectIterResults,
};
use proc_macro2::TokenStream;
use quote::quote;

use crate::{plugin::Plugin, ts_ast::TsAst, Error};

use self::stable_b_tree_map::StableBTreeMapNode;

mod ic_object;
mod to_js_error;

pub mod async_await_result_handler;
pub mod runtime_error;
pub mod stable_b_tree_map;
pub mod unwrap_or_trap;

pub fn generate(
    ts_ast: &TsAst,
    query_methods: &Vec<QueryMethod>,
    update_methods: &Vec<UpdateMethod>,
    services: &Vec<Service>,
    stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>,
    plugins: &Vec<Plugin>,
) -> Result<TokenStream, Vec<Error>> {
    let register_ic_object_function = ic_object::register_function::generate(ts_ast)?;

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
    let ic_object_functions = ic_object::functions::generate(
        &query_and_update_methods,
        services,
        &stable_b_tree_map_nodes,
    );

    let stable_b_tree_maps = stable_b_tree_map::rust::generate(&stable_b_tree_map_nodes);
    let unwrap_or_trap = unwrap_or_trap::generate();
    let runtime_error = runtime_error::generate();
    let to_js_errors = to_js_error::generate();

    let plugins_code = plugins
        .iter()
        .map(|plugin| plugin.to_code())
        .collect_results()?;

    Ok(quote! {
        #runtime_error
        #to_js_errors
        #async_await_result_handler
        #ic_object_functions
        #register_ic_object_function
        #stable_b_tree_maps
        #unwrap_or_trap
        #(#plugins_code)*

        // TODO this is temporary until this issue is resolved: https://github.com/demergent-labs/azle/issues/1029
        #[ic_cdk_macros::query]
        fn __get_candid_interface_tmp_hack() -> String {
            __export_service()
        }
    })
}
