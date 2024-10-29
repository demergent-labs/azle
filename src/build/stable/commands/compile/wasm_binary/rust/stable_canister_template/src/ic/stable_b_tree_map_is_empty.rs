use rquickjs::{Ctx, Function, Result};

use crate::stable_b_tree_map::STABLE_B_TREE_MAPS;

use super::throw_error;

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move |memory_id: u8| {
        STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| -> Result<bool> {
            let stable_b_tree_maps = stable_b_tree_maps.borrow();

            Ok(stable_b_tree_maps
                .get(&memory_id)
                .ok_or(throw_error(
                    ctx.clone(),
                    &format!("could not find StableBTreeMap {memory_id}"),
                ))?
                .is_empty())
        })
    })
}
