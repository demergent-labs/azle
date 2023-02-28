use cdk_framework::{
    act::{
        node::canister_method::{CanisterMethod, CanisterMethodType, QueryOrUpdateMethod},
        CanisterMethods,
    },
    AbstractCanisterTree,
};

use crate::{
    generators::{
        body, header,
        vm_value_conversion::{try_from_vm_value_impls, try_into_vm_value_impls},
    },
    ts_ast::{azle_program::HelperMethods, TsAst},
    ts_keywords,
};

impl TsAst {
    pub fn to_act(&self) -> AbstractCanisterTree {
        let header = header::generate(&self.main_js);
        let keywords = ts_keywords::ts_keywords();

        let query_canister_methods = self
            .azle_programs
            .build_canister_method_nodes(CanisterMethodType::Query);
        let query_methods =
            query_canister_methods
                .iter()
                .fold(vec![], |mut acc, canister_method| {
                    if let CanisterMethod::Query(query_method) = canister_method {
                        acc.push(query_method.clone());
                    }
                    acc
                });
        let query_query_or_update_methods: Vec<_> = query_methods
            .iter()
            .map(|query_method| QueryOrUpdateMethod::Query(query_method.clone()))
            .collect();

        let update_canister_methods = self
            .azle_programs
            .build_canister_method_nodes(CanisterMethodType::Update);
        let update_methods =
            update_canister_methods
                .iter()
                .fold(vec![], |mut acc, canister_method| {
                    if let CanisterMethod::Update(update_method) = canister_method {
                        acc.push(update_method.clone());
                    }
                    acc
                });
        let update_query_or_update_methods: Vec<_> = query_methods
            .iter()
            .map(|query_method| QueryOrUpdateMethod::Query(query_method.clone()))
            .collect();

        let stable_b_tree_map_nodes = self.stable_b_tree_map_nodes();
        let external_canisters = self.build_external_canisters();

        let data_types = self.build_data_types(
            &query_canister_methods,
            &update_canister_methods,
            &stable_b_tree_map_nodes,
            &external_canisters,
            &keywords,
        );

        let heartbeat_method = self.build_heartbeat_method();
        let init_method = self.build_init_method();
        let inspect_message_method = self.build_inspect_method();
        let post_upgrade_method = self.build_post_upgrade_method();
        let pre_upgrade_method = self.build_pre_upgrade_method();

        let try_into_vm_value_impls = try_into_vm_value_impls::generate();
        let try_from_vm_value_impls = try_from_vm_value_impls::generate();

        let query_and_update_methods = vec![
            query_query_or_update_methods,
            update_query_or_update_methods,
        ]
        .concat();

        let body = body::generate(
            self,
            &query_and_update_methods,
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
