use cdk_framework::AbstractCanisterTree;
use proc_macro2::TokenStream;

use crate::ts_ast::TsAst;

use stable_b_tree_map::{AzleStableBTreeMapNode, StableBTreeMapNode};

mod body;
mod candid_type;
mod canister_method;
mod errors;
mod generators;
mod header;
mod stable_b_tree_map;
mod ts_ast;
mod ts_keywords;
mod utils;

pub fn generate_canister(ts_file_names: &Vec<&str>, main_js: String) -> TokenStream {
    TsAst::new(&ts_file_names, main_js)
        .to_act()
        .to_token_stream()
}

impl TsAst {
    pub fn to_act(&self) -> AbstractCanisterTree {
        let candid_types = self.build_candid_types();
        let canister_methods = self.build_canister_methods();
        let stable_b_tree_map_nodes = self.build_stable_b_tree_map_nodes();
        let body = body::generate(
            self,
            &canister_methods.query_methods,
            &canister_methods.update_methods,
            &candid_types.services,
            &stable_b_tree_map_nodes,
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
