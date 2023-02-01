use cdk_framework::{
    nodes::{data_type_nodes, ActCanisterMethod, ActExternalCanister},
    ActDataType,
};

use super::TsAst;
use crate::{
    ts_ast::{
        azle_program::HelperMethods,
        azle_type_alias_decls::azle_type_alias_decl::AzleTypeAliasListHelperMethods,
    },
    StableBTreeMapNode,
};

impl TsAst {
    pub fn build_data_type_nodes(
        &self,
        query_methods: &Vec<ActCanisterMethod>,
        update_methods: &Vec<ActCanisterMethod>,
        stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>,
        external_canisters: &Vec<ActExternalCanister>,
        keywords: &Vec<String>,
    ) -> Vec<ActDataType> {
        let ast_type_alias_decls = &self.azle_programs.get_azle_type_alias_decls();
        let dependencies = self.azle_programs.get_dependent_types();
        let type_aliases = ast_type_alias_decls.build_type_alias_acts(&dependencies);

        let query_method_type_acts =
            cdk_framework::nodes::act_canister_method::get_all_types_from_canister_method_acts(
                query_methods,
            );
        let update_method_type_acts =
            cdk_framework::nodes::act_canister_method::get_all_types_from_canister_method_acts(
                update_methods,
            );
        let stable_b_tree_map_type_acts =
            stable_b_tree_map_nodes
                .iter()
                .fold(vec![], |acc, stable_b_tree_map_node| {
                    let inline_types = vec![
                        stable_b_tree_map_node.key_type.clone(),
                        stable_b_tree_map_node.value_type.clone(),
                    ];
                    vec![acc, inline_types].concat()
                });
        let external_canister_method_type_acts =
            external_canisters.iter().fold(vec![], |acc, canister| {
                let method_types = canister
                    .methods
                    .iter()
                    .map(|method| {
                        let params: Vec<ActDataType> = method
                            .params
                            .iter()
                            .map(|param| param.data_type.clone())
                            .collect();
                        vec![params, vec![method.return_type.clone()]].concat()
                    })
                    .collect::<Vec<Vec<ActDataType>>>()
                    .concat();
                vec![acc, method_types].concat()
            });

        // Recursively collect all dependent ACT Types

        let type_alias_inline_acts = data_type_nodes::build_inline_type_acts(&type_aliases);
        let query_method_inline_acts =
            data_type_nodes::build_inline_type_acts(&query_method_type_acts);
        let update_method_inline_acts =
            data_type_nodes::build_inline_type_acts(&update_method_type_acts);
        let stable_b_tree_map_inline_acts =
            data_type_nodes::build_inline_type_acts(&stable_b_tree_map_type_acts);
        let external_canister_acts =
            data_type_nodes::build_inline_type_acts(&external_canister_method_type_acts);

        let all_inline_acts = vec![
            type_alias_inline_acts,
            query_method_inline_acts,
            update_method_inline_acts,
            stable_b_tree_map_inline_acts,
            external_canister_acts,
        ]
        .concat();
        let all_inline_acts = data_type_nodes::deduplicate(all_inline_acts, keywords);

        vec![type_aliases, all_inline_acts].concat()
    }
}
