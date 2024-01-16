use wasmedge_quickjs::{Context, JsFn, JsValue};

use crate::{AzleStableBTreeMapKey, STABLE_B_TREE_MAPS};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let memory_id_string = if let JsValue::String(js_string) = argv.get(0).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };
        let memory_id: u8 = memory_id_string.parse().unwrap();

        let key = if let JsValue::ArrayBuffer(js_array_buffer) = argv.get(1).unwrap() {
            js_array_buffer.to_vec()
        } else {
            panic!("conversion from JsValue to JsArrayBuffer failed")
        };

        STABLE_B_TREE_MAPS
            .with(|stable_b_tree_maps| {
                let stable_b_tree_maps = stable_b_tree_maps.borrow();

                stable_b_tree_maps[&memory_id].contains_key(&AzleStableBTreeMapKey { bytes: key })
            })
            .into()
    }
}
