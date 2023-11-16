use std::convert::TryInto;

use quickjs_wasm_rs::{to_qjs_value, CallbackArg, JSContextRef, JSValue, JSValueRef};

use crate::{AzleStableBTreeMapKey, AzleStableBTreeMapValue, STABLE_B_TREE_MAPS};

pub fn native_function<'a>(
    context: &'a JSContextRef,
    _this: &CallbackArg,
    args: &[CallbackArg],
) -> Result<JSValueRef<'a>, anyhow::Error> {
    let memory_id_string: String = args
        .get(0)
        .expect("stable_b_tree_map_insert argument 0 is undefined")
        .to_js_value()?
        .try_into()?;
    let memory_id: u8 = memory_id_string.parse()?;

    let key: Vec<u8> = args
        .get(1)
        .expect("stable_b_tree_map_insert argument 1 is undefined")
        .to_js_value()?
        .try_into()?;
    let value: Vec<u8> = args
        .get(2)
        .expect("stable_b_tree_map_insert argument 2 is undefined")
        .to_js_value()?
        .try_into()?;

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
        Some(value) => {
            let candid_bytes_js_value: JSValue = value.bytes.into();

            to_qjs_value(&context, &candid_bytes_js_value)
        }
        None => context.undefined_value(),
    }
}
