use ic_stable_structures::{memory_manager::MemoryId, StableBTreeMap};
use wasmedge_quickjs::{Context, JsFn, JsValue};

use crate::{MEMORY_MANAGER_REF_CELL, STABLE_B_TREE_MAPS};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let memory_id_string = if let JsValue::String(js_string) = argv.get(0).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };
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

        JsValue::UnDefined
    }
}
