use std::convert::TryInto;

use rquickjs::{Ctx, Function};

use crate::stable_b_tree_map::STABLE_B_TREE_MAPS;

pub fn get_function(context: Ctx) -> Function {
    Function::new(
        context,
        |context: Ctx, memory_id: String, start_index: String, length: String| {
            let memory_id: u8 = memory_id.parse().unwrap();
            let start_index: usize = start_index.parse().unwrap();

            let values: Vec<Vec<u8>> = STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
                let stable_b_tree_maps = stable_b_tree_maps.borrow();
                let stable_b_tree_map = &stable_b_tree_maps[&memory_id];

                stable_b_tree_map
                    .iter()
                    .skip(start_index)
                    .take(if length == "NOT_SET" {
                        stable_b_tree_map.len().try_into().unwrap()
                    } else {
                        length.parse().unwrap()
                    })
                    .map(|(_, value)| value.bytes)
                    .collect()
            });

            let js_array = context.new_array().unwrap();

            for (index, item) in values.iter().enumerate() {
                js_array
                    .set(index, context.new_array_buffer(item).unwrap())
                    .unwrap();
            }

            Ok(js_array)
        },
    )
    .unwrap()
}
