use cdk_framework::AbstractCanisterTree;

use crate::{body, generators::header, ts_ast::TsAst, ts_keywords};

impl TsAst {
    pub fn to_act(&self) -> AbstractCanisterTree {
        let canister_methods = self.build_canister_methods();
        let stable_b_tree_map_nodes = self.build_stable_b_tree_map_nodes();
        let candid_types = self.build_candid_types();
        let body = body::generate(
            self,
            &canister_methods.query_methods,
            &canister_methods.update_methods,
            &candid_types.services,
            &stable_b_tree_map_nodes,
        );
        let cdk_name = "azle".to_string();
        let header = header::generate(&self.main_js);
        let guard_functions = self.build_guard_functions();
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
