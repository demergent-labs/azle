use wasmedge_quickjs::{Context, JsFn, JsValue};

use crate::{AzleStableBTreeMapKey, AzleStableBTreeMapValue, STABLE_B_TREE_MAPS};

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

        let value = if let JsValue::ArrayBuffer(js_array_buffer) = argv.get(2).unwrap() {
            js_array_buffer.to_vec()
        } else {
            panic!("conversion from JsValue to JsArrayBuffer failed")
        };

        let value_option = STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
            let mut stable_b_tree_maps = stable_b_tree_maps.borrow_mut();

            let result = stable_b_tree_maps.get_mut(&memory_id).unwrap().insert(
                AzleStableBTreeMapKey { bytes: key },
                AzleStableBTreeMapValue { bytes: value },
            );

            result
        });

        // TODO could we somehow encode the entire option here more easily
        match value_option {
            Some(value) => context.new_array_buffer(&value.bytes).into(),
            None => JsValue::UnDefined,
        }
    }
}
