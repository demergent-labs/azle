use rquickjs::{Ctx, Function, Result};

use crate::stable_b_tree_map::STABLE_B_TREE_MAPS;

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |memory_id: u8| {
        let len = STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
            let stable_b_tree_maps = stable_b_tree_maps.borrow();
            stable_b_tree_maps[&memory_id].len()
        });

        len.to_string()
    })
}
