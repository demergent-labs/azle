use std::convert::TryInto;

use quickjs_wasm_rs::{to_qjs_value, CallbackArg, JSContextRef, JSValue, JSValueRef};

use crate::STABLE_B_TREE_MAPS;

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let memory_id_string: String = args
        .get(0)
        .expect("stable_b_tree_map_items argument 0 is undefined")
        .to_js_value()?
        .try_into()?;
    let memory_id: u8 = memory_id_string.parse()?;

    let start_index_string: String = args
        .get(1)
        .expect("stable_b_tree_map_items argument 1 is undefined")
        .to_js_value()?
        .try_into()?;
    let start_index: usize = start_index_string.parse()?;

    let length_string: String = args
        .get(2)
        .expect("stable_b_tree_map_items argument 2 is undefined")
        .to_js_value()?
        .try_into()?;

    let items: Vec<Vec<Vec<u8>>> = STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
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
            .map(|(key, value)| vec![key.bytes, value.bytes])
            .collect()
    });

    let js_values: Vec<Vec<JSValue>> = items
        .into_iter()
        .map(|items| {
            let keys = items[0].clone();
            let values = items[1].clone();

            vec![keys.into(), values.into()]
        })
        .collect();
    let js_values: Vec<JSValue> = js_values.into_iter().map(|items| items.into()).collect();

    let js_value: JSValue = js_values.into();

    to_qjs_value(&context, &js_value)
}
