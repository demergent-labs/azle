use rand::{SeedableRng, rngs::StdRng};
use rquickjs::{Ctx, Function, Result, TypedArray};

use crate::{CSPRNG, ic::throw_error};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move |seed: TypedArray<u8>| -> Result<()> {
        let bytes: &[u8] = seed.as_ref();

        rand_seed(
            bytes
                .try_into()
                .map_err(|_| throw_error(ctx.clone(), "seed must be exactly 32 bytes in length"))?,
        );

        Ok(())
    })
}

pub fn rand_seed(seed: [u8; 32]) {
    CSPRNG.with(|csprng_refcell| {
        let mut rng = csprng_refcell.borrow_mut();

        *rng = StdRng::from_seed(seed);
    });
}
