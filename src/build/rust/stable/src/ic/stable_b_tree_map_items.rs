use std::convert::TryInto;

use rquickjs::{Array, Ctx, Function, TypedArray};

use crate::stable_b_tree_map::STABLE_B_TREE_MAPS;

pub fn get_function(ctx: Ctx) -> Function {
    Function::new(
        ctx.clone(),
        move |memory_id: u8, start_index: u64, length: i64| {
            let items: Vec<Vec<Vec<u8>>> = STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
                let stable_b_tree_maps = stable_b_tree_maps.borrow();
                let stable_b_tree_map = &stable_b_tree_maps[&memory_id];

                stable_b_tree_map
                    .iter()
                    .skip(start_index.try_into().unwrap())
                    .take(if length == -1 {
                        stable_b_tree_map.len().try_into().unwrap()
                    } else {
                        length.try_into().unwrap()
                    })
                    .map(|(key, value)| vec![key.bytes, value.bytes])
                    .collect()
            });

            let js_array = Array::new(ctx.clone()).unwrap();

            for (index, item) in items.iter().enumerate() {
                let tuple = Array::new(ctx.clone()).unwrap();

                tuple
                    .set(0, TypedArray::<u8>::new(ctx.clone(), item[0].as_slice()))
                    .unwrap();
                tuple
                    .set(1, TypedArray::<u8>::new(ctx.clone(), item[1].as_slice()))
                    .unwrap();

                js_array.set(index, tuple).unwrap();
            }

            js_array
        },
    )
    .unwrap()
}
