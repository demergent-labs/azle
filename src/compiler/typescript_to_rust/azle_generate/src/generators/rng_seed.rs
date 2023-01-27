use quote::quote;

pub fn generate() -> proc_macro2::TokenStream {
    quote! {
        fn _azle_rng_seed() {
            ic_cdk::spawn(async move {
                let result: CallResult<(Vec<u8>,)> = ic_cdk::api::call::call(
                    candid::Principal::from_text("aaaaa-aa").unwrap(),
                    "raw_rand",
                    ()
                ).await;

                RNG_REF_CELL.with(|rng_ref_cell| {
                    let mut rng = rng_ref_cell.borrow_mut();

                    match result {
                        Ok(randomness) => *rng = SeedableRng::from_seed(randomness.0[..].try_into().unwrap()),
                        Err(err) => panic!(err)
                    };
                });
            });
        }
    }
}
