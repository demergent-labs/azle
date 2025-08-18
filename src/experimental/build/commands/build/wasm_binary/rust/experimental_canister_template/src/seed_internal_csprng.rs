use rand::{SeedableRng, rngs::StdRng};

use crate::INTERNAL_CSPRNG;

/// Seeds the internal Azle CSPRNG used for UUID generation. Not exposed to user code.
pub fn seed_internal_csprng(seed: [u8; 32]) {
    INTERNAL_CSPRNG.with(|csprng_refcell| {
        let mut rng = csprng_refcell.borrow_mut();
        *rng = StdRng::from_seed(seed);
    });
}
