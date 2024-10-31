use rquickjs::{Ctx, Function, TypedArray};

use crate::stable_b_tree_map::{AzleStableBTreeMapKey, STABLE_B_TREE_MAPS};

pub fn get_function(ctx: Ctx) -> Function {
    Function::new(ctx, |memory_id: u8, key_typed_array: TypedArray<u8>| {
        let key_slice: &[u8] = key_typed_array.as_ref();
        let key: Vec<u8> = key_slice.to_vec();

        STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
            let stable_b_tree_maps = stable_b_tree_maps.borrow();

            stable_b_tree_maps[&memory_id].contains_key(&AzleStableBTreeMapKey { bytes: key })
        })
    })
    .unwrap()
}
