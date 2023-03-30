use cdk_framework::act::node::CandidType;

use crate::ts_ast::TsAst;

mod new_expr;
mod stable_b_tree_maps;

#[derive(Clone, Debug)]
pub struct StableBTreeMapNode {
    pub memory_id: u8,
    pub key_type: CandidType,
    pub value_type: CandidType,
    pub max_key_size: u32,
    pub max_value_size: u32,
}

impl TsAst {
    pub fn build_stable_b_tree_map_nodes(&self) -> Vec<StableBTreeMapNode> {
        self.azle_programs
            .iter()
            .flat_map(|azle_program| azle_program.azle_stable_b_tree_map_nodes())
            .collect()
    }
}
