pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        use azle_vm_value_derive::{CdkActTryIntoVmValue, CdkActTryFromVmValue};
        use ic_cdk::api::call::CallResult;
        use std::borrow::BorrowMut;
        use rand::{
            Rng,
            SeedableRng,
            rngs::StdRng
        };
        use slotmap::Key as AzleSlotMapKey; // Renamed to avoid clashes with user-defined types
        use std::str::FromStr;
        use std::convert::TryInto;
    }
}
