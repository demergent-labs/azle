use ic_cdk::api::cycles_burn;
use rquickjs::{BigInt, Ctx, Function, Result};

use crate::ic::throw_error;

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(
        ctx.clone(),
        move |amount_string: String| -> Result<BigInt> {
            let amount: u128 = amount_string
                .parse()
                .map_err(|e| throw_error(ctx.clone(), e))?;

            ctx.eval::<BigInt, &str>(&format!("{}n", cycles_burn(amount)))
        },
    )
}
