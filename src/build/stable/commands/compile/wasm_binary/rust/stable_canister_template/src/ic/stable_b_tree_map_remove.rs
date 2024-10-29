use rquickjs::{Ctx, Function, IntoJs, Result, TypedArray, Undefined, Value};

use crate::stable_b_tree_map::{AzleStableBTreeMapKey, STABLE_B_TREE_MAPS};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(
        ctx.clone(),
        move |memory_id: u8, key_typed_array: TypedArray<u8>| -> Result<Value> {
            let key_slice: &[u8] = key_typed_array.as_ref();
            let key: Vec<u8> = key_slice.to_vec();

            let value_option = STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
                let mut stable_b_tree_maps = stable_b_tree_maps.borrow_mut();

                stable_b_tree_maps
                    .get_mut(&memory_id)?
                    .remove(&AzleStableBTreeMapKey { bytes: key })
            });

            match value_option {
                Some(value) => Ok(
                    TypedArray::<u8>::new(ctx.clone(), value.bytes.as_slice())?.into_js(&ctx)?
                ),
                None => Ok(Undefined.into_js(&ctx)?),
            }
        },
    )
}
