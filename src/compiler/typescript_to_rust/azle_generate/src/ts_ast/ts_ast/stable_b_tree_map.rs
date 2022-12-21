use super::TsAst;
use crate::stable_b_tree_map_node::StableBTreeMapNode;

impl TsAst {
    pub fn stable_b_tree_map_nodes(&self) -> Vec<StableBTreeMapNode> {
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
