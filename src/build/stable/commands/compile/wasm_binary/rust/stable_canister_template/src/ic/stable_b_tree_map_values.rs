use std::convert::TryInto;

use rquickjs::{Array, Ctx, FromIteratorJs, Function, Result};

use crate::{ic::throw_error, stable_b_tree_map::STABLE_B_TREE_MAPS};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(
        ctx.clone(),
        move |memory_id: u8, start_index: u64, length: i64| -> Result<Array> {
            let values: Vec<Vec<u8>> = STABLE_B_TREE_MAPS
                .with(|stable_b_tree_maps| -> Result<Vec<Vec<u8>>> {
                    let stable_b_tree_maps = stable_b_tree_maps.borrow();
                    let stable_b_tree_map = &stable_b_tree_maps[&memory_id];

                    Ok(stable_b_tree_map
                        .iter()
                        .skip(
                            start_index
                                .try_into()
                                .map_err(|e| throw_error(ctx.clone(), e))?,
                        )
                        .take(if length == -1 {
                            stable_b_tree_map
                                .len()
                                .try_into()
                                .map_err(|e| throw_error(ctx.clone(), e))?
                        } else {
                            length.try_into().map_err(|e| throw_error(ctx.clone(), e))?
                        })
                        .map(|(_, value)| value.bytes)
                        .collect())
                })
                .map_err(|e| throw_error(ctx.clone(), e))?;

            Array::from_iter_js(&ctx, values.into_iter())
        },
    )
}
