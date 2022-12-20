use super::TsAst;
use crate::stable_b_tree_map::StableBTreeMap;

impl TsAst {
    pub fn stable_b_tree_maps(&self) -> Vec<StableBTreeMap> {
        self.azle_programs.iter().fold(vec![], |acc, azle_program| {
            let stable_maps = azle_program.stable_b_tree_maps();

            vec![acc, stable_maps].concat()
        })
    }
}
