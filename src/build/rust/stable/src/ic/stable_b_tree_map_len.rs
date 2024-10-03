use rquickjs::{Ctx, Function};

use crate::stable_b_tree_map::STABLE_B_TREE_MAPS;

pub fn get_function(context: Ctx) -> Function {
    Function::new(context, |memory_id_string: String| {
        let memory_id: u8 = memory_id_string.parse().unwrap();

        let len = STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
            let stable_b_tree_maps = stable_b_tree_maps.borrow();
            stable_b_tree_maps[&memory_id].len()
        });

        len.to_string()
    })
    .unwrap()
}
