use ic_cdk::api::msg_cycles_accept;
use rquickjs::{Ctx, Function, Result};

use crate::ic::throw_error;

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(
        ctx.clone(),
        move |max_amount_string: String| -> Result<String> {
            let max_amount: u128 = max_amount_string
                .parse()
                .map_err(|e| throw_error(ctx.clone(), e))?;

            Ok(msg_cycles_accept(max_amount).to_string())
        },
    )
}
