use rquickjs::{Ctx, Function, Result, Value};

use crate::{ic::throw_error, stable_b_tree_map::with_stable_b_tree_map};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move |memory_id: u8| -> Result<Value> {
        with_stable_b_tree_map(ctx.clone(), memory_id, |stable_b_tree_map| {
            let len = stable_b_tree_map.len();
            let js_number_max_safe_integer = 2u64.pow(53) - 1;

            if len <= js_number_max_safe_integer {
                // This conversion is safe because we have ensured that the u64 is within the safe integer limits
                // of the IEEE-754 64-bit floating-point number standard
                let len_f64 = len as f64;
                Ok(Value::new_number(ctx.clone(), len_f64))
            } else {
                Err(throw_error(
                    ctx.clone(),
                    "The StableBTreeMap length is greater than JavaScript's Number.MAX_SAFE_INTEGER",
                ))
            }
        })?
    })
}
