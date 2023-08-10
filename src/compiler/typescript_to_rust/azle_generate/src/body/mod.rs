use cdk_framework::traits::CollectIterResults;
use proc_macro2::TokenStream;
use quote::quote;

use crate::{plugin::Plugin, Error};

pub mod ic_object;
mod to_js_error;

pub mod async_await_result_handler;
pub mod runtime_error;
pub mod stable_b_tree_map;
pub mod unwrap_or_trap;

pub fn generate(plugins: &Vec<Plugin>) -> Result<TokenStream, Vec<Error>> {
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
        #unwrap_or_trap
        #(#plugins_code)*

        // TODO this is temporary until this issue is resolved: https://github.com/demergent-labs/azle/issues/1029
        #[ic_cdk_macros::query]
        fn __get_candid_interface_tmp_hack() -> String {
            __export_service()
        }
    })
}
