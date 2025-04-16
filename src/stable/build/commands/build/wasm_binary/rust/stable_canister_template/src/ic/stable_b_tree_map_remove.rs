use rquickjs::{Ctx, Function, Result, TypedArray};

use crate::stable_b_tree_map::{AzleStableBTreeMapKey, with_stable_b_tree_map_mut};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(
        ctx.clone(),
        move |memory_id: u8, key_typed_array: TypedArray<u8>| -> Result<Option<TypedArray<u8>>> {
            with_stable_b_tree_map_mut(ctx.clone(), memory_id, |stable_b_tree_map| {
                let key_slice: &[u8] = key_typed_array.as_ref();
                let key: Vec<u8> = key_slice.to_vec();
                let azle_sable_b_tree_map_key = AzleStableBTreeMapKey { bytes: key };

                stable_b_tree_map
                    .remove(&azle_sable_b_tree_map_key)
                    .map(|value| TypedArray::<u8>::new(ctx.clone(), value.bytes))
                    .transpose()
            })?
        },
    )
}
