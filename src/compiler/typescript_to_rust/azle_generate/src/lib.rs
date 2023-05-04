use cdk_framework::AbstractCanisterTree;
use proc_macro2::TokenStream;

use crate::ts_ast::TsAst;

use body::stable_b_tree_map::StableBTreeMapNode;
use plugin::Plugin;

mod body;
mod candid_type;
mod canister_method;
mod errors;
mod guard_function;
mod header;
pub mod plugin;
pub mod traits;
mod ts_ast;
mod ts_keywords;
mod vm_value_conversion;

pub fn generate_canister(
    ts_file_names: &Vec<String>,
    main_js: String,
    plugins: &Vec<Plugin>,
    environment_variables: &Vec<(String, String)>,
) -> TokenStream {
    TsAst::new(ts_file_names, main_js)
        .to_act(plugins, environment_variables)
        .to_token_stream()
}

impl TsAst {
    pub fn to_act(
        &self,
        plugins: &Vec<Plugin>,
        environment_variables: &Vec<(String, String)>,
    ) -> AbstractCanisterTree {
        let candid_types = self.build_candid_types();
        let canister_methods = self.build_canister_methods(plugins, environment_variables);
        let body = body::generate(
            self,
            &canister_methods.query_methods,
            &canister_methods.update_methods,
            &candid_types.services,
            plugins,
        );
        let cdk_name = "azle".to_string();
        let guard_functions = self.build_guard_functions();
        let header = header::generate(&self.main_js);
        let keywords = ts_keywords::ts_keywords();
        let vm_value_conversion = self.build_vm_value_conversion();

        AbstractCanisterTree {
            body,
            canister_methods,
            cdk_name,
            candid_types,
            guard_functions,
            header,
            keywords,
            vm_value_conversion,
        }
    }
}
