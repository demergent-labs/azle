use rquickjs::{Ctx, Function, Result};

use crate::{ic::throw_error, stable_b_tree_map::with_stable_b_tree_map};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move |memory_id: u8| -> Result<u32> {
        with_stable_b_tree_map(ctx.clone(), memory_id, |stable_b_tree_map| {
            stable_b_tree_map.len().try_into().map_err(|e| {
                throw_error(
                    ctx.clone(),
                    format!("StableBTreeMap length is currently limited to 2^32 - 1 (4_294_967_295) items or fewer: {e}"),
                )
            })
        })?
    })
}
