use std::convert::TryInto;

use rquickjs::{Ctx, Function, Result, TypedArray};

use crate::{ic::throw_error, stable_b_tree_map::with_stable_b_tree_map};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(
        ctx.clone(),
        move |memory_id: u8, start_index: u64, length: i64| -> Result<Vec<TypedArray<u8>>> {
            with_stable_b_tree_map(ctx.clone(), memory_id, |stable_b_tree_map| {
                let skip_amount: usize = start_index
                    .try_into()
                    .map_err(|e| throw_error(ctx.clone(), e))?;

                let take_amount: usize = if length == -1 {
                    stable_b_tree_map
                        .len()
                        .try_into()
                        .map_err(|e| throw_error(ctx.clone(), e))?
                } else {
                    length.try_into().map_err(|e| throw_error(ctx.clone(), e))?
                };

                let keys: Vec<TypedArray<u8>> = stable_b_tree_map
                    .iter()
                    .skip(skip_amount)
                    .take(take_amount)
                    .map(|(key, _)| TypedArray::new(ctx.clone(), key.bytes))
                    .collect::<Result<Vec<TypedArray<u8>>>>()?;

                Ok(keys)
            })?
        },
    )
}
