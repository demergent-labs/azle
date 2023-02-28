use cdk_framework::AbstractCanisterTree;

use crate::{
    generators::{
        body, header,
        vm_value_conversion::{try_from_vm_value_impls, try_into_vm_value_impls},
    },
    ts_ast::TsAst,
    ts_keywords,
};

impl TsAst {
    pub fn to_act(&self) -> AbstractCanisterTree {
        let canister_methods = self.build_canister_methods();
        let external_canisters = self.build_external_canisters();
        let stable_b_tree_map_nodes = self.stable_b_tree_map_nodes();
        let body = body::generate(
            self,
            &canister_methods.query_methods,
            &canister_methods.update_methods,
            &external_canisters,
            &stable_b_tree_map_nodes,
        );
        let cdk_name = "azle".to_string();
        let data_types = self.build_data_types();
        let header = header::generate(&self.main_js);
        let guard_functions = vec![]; // TODO: See https://github.com/demergent-labs/azle/issues/859
        let keywords = ts_keywords::ts_keywords();
        let try_into_vm_value_impls = try_into_vm_value_impls::generate();
        let try_from_vm_value_impls = try_from_vm_value_impls::generate();

        AbstractCanisterTree {
            body,
            canister_methods,
            cdk_name,
            data_types,
            external_canisters,
            guard_functions,
            header,
            keywords,
            try_from_vm_value_impls,
            try_into_vm_value_impls,
        }
    }
}
