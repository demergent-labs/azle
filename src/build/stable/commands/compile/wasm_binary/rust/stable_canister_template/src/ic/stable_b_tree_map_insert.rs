use rquickjs::{Ctx, Function, TypedArray};

use crate::stable_b_tree_map::{
    AzleStableBTreeMapKey, AzleStableBTreeMapValue, STABLE_B_TREE_MAPS,
};

pub fn get_function(context: Ctx) -> Function {
    Function::new(
        context,
        |memory_id: u8, key_typed_array: TypedArray<u8>, value_typed_array: TypedArray<u8>| {
            let key_slice: &[u8] = key_typed_array.as_ref();
            let key: Vec<u8> = key_slice.to_vec();

            let value_slice: &[u8] = value_typed_array.as_ref();
            let value: Vec<u8> = value_slice.to_vec();

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
