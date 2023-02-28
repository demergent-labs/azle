use cdk_framework::{act::CanisterMethods, AbstractCanisterTree};

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
        let header = header::generate(&self.main_js);
        let keywords = ts_keywords::ts_keywords();

        let query_methods = self.build_query_methods();
        let update_methods = self.build_update_methods();

        let stable_b_tree_map_nodes = self.stable_b_tree_map_nodes();
        let external_canisters = self.build_external_canisters();

        let data_types = self.build_data_types();

        let heartbeat_method = self.build_heartbeat_method();
        let init_method = self.build_init_method();
        let inspect_message_method = self.build_inspect_method();
        let post_upgrade_method = self.build_post_upgrade_method();
        let pre_upgrade_method = self.build_pre_upgrade_method();

        let try_into_vm_value_impls = try_into_vm_value_impls::generate();
        let try_from_vm_value_impls = try_from_vm_value_impls::generate();

        let body = body::generate(
            self,
            &query_methods,
            &update_methods,
            &external_canisters,
            &stable_b_tree_map_nodes,
        );

        AbstractCanisterTree {
            cdk_name: "azle".to_string(),
            canister_methods: CanisterMethods {
                heartbeat_method,
                init_method,
                inspect_message_method,
                post_upgrade_method,
                pre_upgrade_method: Some(pre_upgrade_method),
                query_methods,
                update_methods,
            },
            data_types,
            external_canisters,
            guard_functions: vec![], // TODO: See https://github.com/demergent-labs/azle/issues/859
            header,
            body,
            try_from_vm_value_impls,
            try_into_vm_value_impls,
            keywords,
        }
    }
}
