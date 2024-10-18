use rquickjs::{Ctx, Function};

use crate::stable_b_tree_map::STABLE_B_TREE_MAPS;

pub fn get_function(ctx: Ctx) -> Function {
    Function::new(ctx, |memory_id: u8| {
        STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
            let stable_b_tree_maps = stable_b_tree_maps.borrow();
            stable_b_tree_maps.get(&memory_id).unwrap().is_empty()
        })
    })
    .unwrap()
}
