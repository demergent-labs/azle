use rquickjs::{Ctx, Function};

use crate::stable_b_tree_map::{AzleStableBTreeMapKey, STABLE_B_TREE_MAPS};

pub fn get_function(context: Ctx) -> Function {
    Function::new(
        context,
        |context: Ctx, memory_id_string: String, key: Vec<u8>| {
            let memory_id: u8 = memory_id_string.parse().unwrap();

            let value_option = STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
                let mut stable_b_tree_maps = stable_b_tree_maps.borrow_mut();

                stable_b_tree_maps
                    .get_mut(&memory_id)
                    .unwrap()
                    .remove(&AzleStableBTreeMapKey { bytes: key })
            });

            match value_option {
                Some(value) => context.new_array_buffer(&value.bytes).unwrap(),
                None => rquickjs::Value::Undefined,
            }
        },
    )
    .unwrap()
}
