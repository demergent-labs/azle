use rquickjs::{Ctx, Function, Result, TypedArray};

use crate::{
    ic::throw_error,
    stable_b_tree_map::{
        with_stable_b_tree_map_mut, AzleStableBTreeMapKey, AzleStableBTreeMapValue,
    },
};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(
        ctx.clone(),
        move |memory_id: u8,
              key_typed_array: TypedArray<u8>,
              value_typed_array: TypedArray<u8>|
              -> Result<Option<TypedArray<u8>>> {
            with_stable_b_tree_map_mut(ctx.clone(), memory_id, |stable_b_tree_map| {
                let key_slice: &[u8] = key_typed_array.as_ref();
                let key: Vec<u8> = key_slice.to_vec();
                let azle_stable_b_tree_map_key = AzleStableBTreeMapKey { bytes: key };

                let inserting_a_new_item =
                    stable_b_tree_map.contains_key(&azle_stable_b_tree_map_key) == false;
                let max_u32 = 2u64.pow(32) - 1;

                if inserting_a_new_item && stable_b_tree_map.len() >= max_u32 {
                    return Err(throw_error(ctx.clone(), "StableBTreeMap is currently limited to 2^32 - 1 (4_294_967_295) items or fewer"));
                }

                let value_slice: &[u8] = value_typed_array.as_ref();
                let value: Vec<u8> = value_slice.to_vec();
                let azle_stable_b_tree_map_value = AzleStableBTreeMapValue { bytes: value };

                stable_b_tree_map
                    .insert(azle_stable_b_tree_map_key, azle_stable_b_tree_map_value)
                    .map(|value| TypedArray::new(ctx.clone(), value.bytes))
                    .transpose()
            })?
        },
    )
}
