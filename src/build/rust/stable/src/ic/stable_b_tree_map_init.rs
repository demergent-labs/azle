use ic_stable_structures::{memory_manager::MemoryId, StableBTreeMap};
use rquickjs::{Ctx, Function};

use crate::stable_b_tree_map::STABLE_B_TREE_MAPS;
use crate::MEMORY_MANAGER_REF_CELL;

pub fn get_function(context: Ctx) -> Function {
    Function::new(context, |memory_id_string: String| {
        let memory_id: u8 = memory_id_string.parse().unwrap();

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
    .unwrap()
}
