use rquickjs::{Ctx, Function, Result};

use crate::stable_b_tree_map::with_stable_b_tree_map;

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move |memory_id: u8| -> Result<bool> {
        with_stable_b_tree_map(ctx.clone(), memory_id, |stable_b_tree_map| {
            stable_b_tree_map.is_empty()
        })
    })
}
