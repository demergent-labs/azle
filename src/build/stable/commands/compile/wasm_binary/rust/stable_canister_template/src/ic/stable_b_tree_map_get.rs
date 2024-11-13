use rquickjs::{Ctx, Function, Result, TypedArray};

use crate::stable_b_tree_map::{with_stable_b_tree_map, AzleStableBTreeMapKey};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(
        ctx.clone(),
        move |memory_id: u8, key_typed_array: TypedArray<u8>| -> Result<Option<TypedArray<u8>>> {
            with_stable_b_tree_map(ctx.clone(), memory_id, |stable_b_tree_map| {
                let key_slice: &[u8] = key_typed_array.as_ref();
                let key: Vec<u8> = key_slice.to_vec();

                stable_b_tree_map
                    .get(&AzleStableBTreeMapKey { bytes: key })
                    .map(|value| TypedArray::new(ctx.clone(), value.bytes))
                    .transpose()
            })?
        },
    )
}
