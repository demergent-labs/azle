use std::convert::TryInto;

use rquickjs::{Ctx, Function, Result, TypedArray};

use crate::{ic::throw_error, stable_b_tree_map::with_stable_b_tree_map};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(
        ctx.clone(),
        move |memory_id: u8,
              start_index_option: Option<u32>,
              length_option: Option<u32>|
              -> Result<Vec<TypedArray<u8>>> {
            with_stable_b_tree_map(ctx.clone(), memory_id, |stable_b_tree_map| {
                let skip_amount: usize = if let Some(start_index) = start_index_option {
                    start_index
                        .try_into()
                        .map_err(|e| throw_error(ctx.clone(), e))?
                } else {
                    0
                };

                let take_amount: usize = if let Some(length) = length_option {
                    length.try_into().map_err(|e| throw_error(ctx.clone(), e))?
                } else {
                    stable_b_tree_map
                        .len()
                        .try_into()
                        .map_err(|e| throw_error(ctx.clone(), e))?
                };

                let values: Vec<TypedArray<u8>> = stable_b_tree_map
                    .iter()
                    .skip(skip_amount)
                    .take(take_amount)
                    .map(|entry| TypedArray::<u8>::new(ctx.clone(), entry.value().bytes.clone()))
                    .collect::<Result<Vec<TypedArray<u8>>>>()?;

                Ok(values)
            })?
        },
    )
}
