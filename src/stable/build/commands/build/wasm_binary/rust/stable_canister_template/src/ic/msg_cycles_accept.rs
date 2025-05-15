use ic_cdk::api::msg_cycles_accept;
use rquickjs::{BigInt, Ctx, Function, Result};

use crate::ic::throw_error;

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(
        ctx.clone(),
        move |max_amount_string: String| -> Result<BigInt> {
            let max_amount: u128 = max_amount_string
                .parse()
                .map_err(|e| throw_error(ctx.clone(), e))?;

            ctx.eval::<BigInt, &str>(&format!("{}n", msg_cycles_accept(max_amount)))
        },
    )
}
