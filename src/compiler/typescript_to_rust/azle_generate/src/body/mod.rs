use cdk_framework::{
    act::node::{
        candid::Service,
        canister_method::{QueryMethod, QueryOrUpdateMethod, UpdateMethod},
    },
    traits::CollectResults,
};
use proc_macro2::TokenStream;
use quote::quote;
use std::path::PathBuf;

use crate::{
    errors::errors::{UnableToLoadPlugin, UnableToParsePlugin},
    plugin::Plugin,
    ts_ast::TsAst,
    Error,
};

use self::stable_b_tree_map::StableBTreeMapNode;

mod ic_object;

pub mod async_await_result_handler;
pub mod boa_error_handlers;
pub mod stable_b_tree_map;

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
    let boa_error_handlers = boa_error_handlers::generate();
    let ic_object_functions = ic_object::functions::generate(
        &query_and_update_methods,
        services,
        &stable_b_tree_map_nodes,
    );

    let stable_b_tree_maps = stable_b_tree_map::rust::generate(&stable_b_tree_map_nodes);

    let plugins_code = plugins
        .iter()
        .map(|plugin| {
            let plugin_file_name = PathBuf::from(&plugin.path).join("src").join("lib.rs");
            let plugin_code = match std::fs::read_to_string(plugin_file_name.clone()) {
                Ok(plugin_code) => plugin_code,
                Err(err) => {
                    return Err(vec![
                        UnableToLoadPlugin::from_error(err, &plugin_file_name).into()
                    ])
                }
            };

            match syn::parse_str::<TokenStream>(&plugin_code) {
                Ok(token_stream) => Ok(token_stream),
                Err(err) => Err(vec![UnableToParsePlugin::from_error(
                    err,
                    &plugin_file_name,
                )
                .into()]),
            }
        })
        .collect::<Vec<_>>()
        .collect_results()?;

    Ok(quote! {
        #async_await_result_handler
        #boa_error_handlers
        #ic_object_functions
        #register_ic_object_function
        #stable_b_tree_maps
        #(#plugins_code)*

        // TODO this is temporary until this issue is resolved: https://github.com/demergent-labs/azle/issues/1029
        #[ic_cdk_macros::query]
        fn __get_candid_interface_tmp_hack() -> String {
            __export_service()
        }
    })
}
