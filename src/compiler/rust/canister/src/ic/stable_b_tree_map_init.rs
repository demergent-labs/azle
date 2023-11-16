use std::convert::TryInto;

use ic_stable_structures::{memory_manager::MemoryId, StableBTreeMap};
use quickjs_wasm_rs::{CallbackArg, JSContextRef, JSValueRef};

use crate::{MEMORY_MANAGER_REF_CELL, STABLE_B_TREE_MAPS};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let memory_id_string: String = args
        .get(0)
        .expect("stable_b_tree_map_init argument 0 is undefined")
        .to_js_value()?
        .try_into()?;
    let memory_id: u8 = memory_id_string.parse()?;

    STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
        let mut stable_b_tree_maps = stable_b_tree_maps.borrow_mut();
        stable_b_tree_maps.insert(
            memory_id,
            StableBTreeMap::init(
                MEMORY_MANAGER_REF_CELL.with(|m| m.borrow().get(MemoryId::new(memory_id))),
            ),
        );
    });

    context.undefined_value()
}
