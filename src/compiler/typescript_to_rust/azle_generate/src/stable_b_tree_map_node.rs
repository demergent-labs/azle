use cdk_framework::{ActDataType, ToActDataType};
use std::collections::{HashMap, HashSet};
use swc_common::SourceMap;
use swc_ecma_ast::TsType;

use crate::ts_ast::{ast_traits::GetDependencies, azle_type::AzleType, AzleTypeAliasDecl};

#[derive(Clone, Debug)]
pub struct StableBTreeMapNode {
    pub memory_id: u8,
    pub key_type: ActDataType,
    pub value_type: ActDataType,
    pub max_key_size: u32,
    pub max_value_size: u32,
}

#[derive(Clone)]
pub struct AzleStableBTreeMapNode {
    pub memory_id: u8,
    pub key_type: TsType,
    pub value_type: TsType,
    pub max_key_size: u32,
    pub max_value_size: u32,
}

impl AzleStableBTreeMapNode {
    pub fn to_stable_b_tree_map_node(&self, source_map: &SourceMap) -> StableBTreeMapNode {
        let key_type =
            AzleType::from_ts_type(self.key_type.clone(), source_map).to_act_data_type(&None);

        let value_type =
            AzleType::from_ts_type(self.value_type.clone(), source_map).to_act_data_type(&None);

        StableBTreeMapNode {
            memory_id: self.memory_id,
            key_type,
            value_type,
            max_key_size: self.max_key_size,
            max_value_size: self.max_value_size,
        }
    }

    pub fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
        source_map: &SourceMap,
    ) -> HashSet<String> {
        let key_type = AzleType::from_ts_type(self.key_type.clone(), source_map);
        let value_type = AzleType::from_ts_type(self.value_type.clone(), source_map);
        let azle_types = vec![key_type, value_type];

        azle_types
            .iter()
            .fold(found_type_names.clone(), |acc, azle_type| {
                acc.union(&azle_type.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}
