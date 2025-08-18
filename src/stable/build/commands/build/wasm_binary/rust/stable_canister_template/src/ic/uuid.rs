use rand::RngCore;
use rquickjs::{Ctx, Function, Result};

use crate::INTERNAL_CSPRNG;

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move || -> Result<String> {
        INTERNAL_CSPRNG.with(|csprng_refcell| {
            let mut rng = csprng_refcell.borrow_mut();

            let mut bytes = [0u8; 16];

            rng.fill_bytes(&mut bytes);

            let hex = format!("{:032x}", u128::from_be_bytes(bytes));

            Ok(hex)
        })
    })
}
