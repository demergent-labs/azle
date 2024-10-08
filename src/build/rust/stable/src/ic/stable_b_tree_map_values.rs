use std::convert::TryInto;

use rquickjs::{Array, Ctx, FromIteratorJs, Function};

use crate::stable_b_tree_map::STABLE_B_TREE_MAPS;

pub fn get_function(ctx: Ctx) -> Function {
    Function::new(
        ctx.clone(),
        move |memory_id: u8, start_index: u64, length: i64| {
            let values: Vec<Vec<u8>> = STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
                let stable_b_tree_maps = stable_b_tree_maps.borrow();
                let stable_b_tree_map = &stable_b_tree_maps[&memory_id];

                stable_b_tree_map
                    .iter()
                    .skip(start_index.try_into().unwrap())
                    .take(if length == -1 {
                        stable_b_tree_map.len().try_into().unwrap()
                    } else {
                        length.try_into().unwrap()
                    })
                    .map(|(_, value)| value.bytes)
                    .collect()
            });

            Array::from_iter_js(&ctx, values.into_iter())
        },
    )
    .unwrap()
}
