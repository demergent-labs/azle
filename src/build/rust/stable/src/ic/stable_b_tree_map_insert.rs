use rquickjs::{Ctx, Function};

use crate::stable_b_tree_map::{
    AzleStableBTreeMapKey, AzleStableBTreeMapValue, STABLE_B_TREE_MAPS,
};

pub fn get_function(context: Ctx) -> Function {
    Function::new(
        context,
        |memory_id_string: String, key: Vec<u8>, value: Vec<u8>| {
            let memory_id: u8 = memory_id_string.parse().unwrap();

            let value_option = STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
                let mut stable_b_tree_maps = stable_b_tree_maps.borrow_mut();

                stable_b_tree_maps.get_mut(&memory_id).unwrap().insert(
                    AzleStableBTreeMapKey { bytes: key },
                    AzleStableBTreeMapValue { bytes: value },
                )
            });

            value_option.map(|value| value.bytes)
        },
    )
    .unwrap()
}
