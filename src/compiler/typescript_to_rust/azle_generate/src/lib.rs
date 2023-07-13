use alias_table::AliasLists;
use cdk_framework::{traits::CollectResults, AbstractCanisterTree};
use proc_macro2::TokenStream;

pub use crate::errors::{Error, GuardFunctionNotFound};
use crate::{body::stable_b_tree_map::StableBTreeMapNode, ts_ast::TsAst};

mod body;
mod candid_type;
mod canister_method;
mod guard_function;
mod header;
mod macros;
mod ts_ast;
mod ts_keywords;
mod vm_value_conversion;

pub mod alias_table;
pub mod errors;
pub mod plugin;
pub mod traits;

pub use alias_table::AliasTable;
pub use alias_table::AliasTables;
pub use plugin::Plugin;

pub fn generate_canister(
    ts_file_names: &Vec<String>,
    main_js: String,
    alias_tables: AliasTables,
    alias_lists: AliasLists,
    plugins: &Vec<Plugin>,
    environment_variables: &Vec<(String, String)>,
) -> Result<TokenStream, Vec<Error>> {
    TsAst::new(ts_file_names, main_js, alias_tables, alias_lists)?
        .to_act(plugins, environment_variables)?
        .to_token_stream()
        .map_err(|cdkf_errors| cdkf_errors.into_iter().map(Error::from).collect())
}

impl TsAst {
    pub fn to_act(
        &self,
        plugins: &Vec<Plugin>,
        environment_variables: &Vec<(String, String)>,
    ) -> Result<AbstractCanisterTree, Vec<Error>> {
        let (candid_types, canister_methods, stable_b_tree_maps) = (
            self.build_candid_types(),
            self.build_canister_methods(plugins, environment_variables),
            self.build_stable_b_tree_map_nodes(),
        )
            .collect_results()?;

        let guard_functions = self.build_guard_functions();
        let body = body::generate(
            self,
            &canister_methods.query_methods,
            &canister_methods.update_methods,
            &candid_types.services,
            &stable_b_tree_maps,
            plugins,
        )?;
        let cdk_name = "azle".to_string();
        let header = header::generate(&self.main_js);
        let keywords = ts_keywords::ts_keywords();
        let vm_value_conversion = self.build_vm_value_conversion();

        Ok(AbstractCanisterTree {
            body,
            canister_methods,
            cdk_name,
            candid_types,
            guard_functions,
            header,
            keywords,
            vm_value_conversion,
        })
    }
}
