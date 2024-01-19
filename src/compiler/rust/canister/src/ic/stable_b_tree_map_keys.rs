use std::convert::TryInto;

use wasmedge_quickjs::{Context, JsFn, JsValue};

use crate::STABLE_B_TREE_MAPS;

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let memory_id_string = if let JsValue::String(js_string) = argv.get(0).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };
        let memory_id: u8 = memory_id_string.parse().unwrap();

        let start_index_string = if let JsValue::String(js_string) = argv.get(1).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };
        let start_index: usize = start_index_string.parse().unwrap();

        let length_string = if let JsValue::String(js_string) = argv.get(2).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };

        let keys: Vec<Vec<u8>> = STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
            let stable_b_tree_maps = stable_b_tree_maps.borrow();
            let stable_b_tree_map = &stable_b_tree_maps[&memory_id];

            stable_b_tree_map
                .iter()
                .skip(start_index)
                .take(if length_string == "NOT_SET" {
                    stable_b_tree_map.len().try_into().unwrap()
                } else {
                    length_string.parse().unwrap()
                })
                .map(|(key, _)| key.bytes)
                .collect()
        });

        let mut js_array = context.new_array();

        for (index, item) in keys.iter().enumerate() {
            js_array.put(index, context.new_array_buffer(item).into());
        }

        js_array.into()
    }
}
