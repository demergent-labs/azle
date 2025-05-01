use rand::RngCore;
use rquickjs::{Ctx, Function, Result, TypedArray};

use crate::CSPRNG;

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(
        ctx.clone(),
        move |byte_length: usize| -> Result<TypedArray<u8>> {
            CSPRNG.with(|csprng_refcell| {
                let mut rng = csprng_refcell.borrow_mut();

                let mut bytes = vec![0; byte_length];

                rng.fill_bytes(bytes.as_mut_slice());

                TypedArray::<u8>::new(ctx.clone(), bytes)
            })
        },
    )
}
