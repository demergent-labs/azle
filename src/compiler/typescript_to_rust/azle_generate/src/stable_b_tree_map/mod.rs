use cdk_framework::act::node::CandidType;
use swc_common::SourceMap;
use swc_ecma_ast::TsType;

use crate::ts_ast::{azle_type::AzleType, TsAst};

mod stable_b_tree_maps;

#[derive(Clone, Debug)]
pub struct StableBTreeMapNode {
    pub memory_id: u8,
    pub key_type: CandidType,
    pub value_type: CandidType,
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
        let key_type = AzleType::from_ts_type(self.key_type.clone(), source_map).to_data_type();

        let value_type = AzleType::from_ts_type(self.value_type.clone(), source_map).to_data_type();

        StableBTreeMapNode {
            memory_id: self.memory_id,
            key_type,
            value_type,
            max_key_size: self.max_key_size,
            max_value_size: self.max_value_size,
        }
    }
}

impl TsAst {
    pub fn build_stable_b_tree_map_nodes(&self) -> Vec<StableBTreeMapNode> {
        self.azle_programs.iter().fold(vec![], |acc, azle_program| {
            let azle_stable_maps = azle_program.azle_stable_b_tree_map_nodes();
            let stable_maps = azle_stable_maps
                .iter()
                .map(|azle_node| azle_node.to_stable_b_tree_map_node(&azle_program.source_map))
                .collect();

            vec![acc, stable_maps].concat()
        })
    }
}
