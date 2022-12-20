use super::TsAst;
use crate::stable_b_tree_map_node::StableBTreeMapNode;

impl TsAst {
    pub fn stable_b_tree_map_nodes(&self) -> Vec<StableBTreeMapNode> {
        self.azle_programs.iter().fold(vec![], |acc, azle_program| {
            let stable_maps = azle_program.stable_b_tree_map_nodes();

            vec![acc, stable_maps].concat()
        })
    }
}
