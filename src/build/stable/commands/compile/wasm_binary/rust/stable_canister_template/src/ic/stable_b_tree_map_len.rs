use rquickjs::{BigInt, Ctx, Function, Result};

use crate::stable_b_tree_map::with_stable_b_tree_map;

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move |memory_id: u8| -> Result<BigInt> {
        with_stable_b_tree_map(ctx.clone(), memory_id, |stable_b_tree_map| {
            BigInt::from_u64(ctx.clone(), stable_b_tree_map.len())
        })?
    })
}
