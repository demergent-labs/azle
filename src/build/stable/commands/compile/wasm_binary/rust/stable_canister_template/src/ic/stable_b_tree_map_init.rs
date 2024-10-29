use ic_stable_structures::{memory_manager::MemoryId, StableBTreeMap};
use rquickjs::{Ctx, Function, Result};

use crate::{stable_b_tree_map::STABLE_B_TREE_MAPS, MEMORY_MANAGER_REF_CELL};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |memory_id: u8| {
        STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
            let mut stable_b_tree_maps = stable_b_tree_maps.borrow_mut();

            stable_b_tree_maps.insert(
                memory_id,
                StableBTreeMap::init(
                    MEMORY_MANAGER_REF_CELL.with(|m| m.borrow().get(MemoryId::new(memory_id))),
                ),
            );
        });
    })
}
