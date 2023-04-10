pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        use azle_vm_value_derive::{CdkActTryIntoVmValue, CdkActTryFromVmValue};
        use candid::{Decode, Encode};
        use rand::Rng as _AzleTraitRng;
        use slotmap::Key as _AzleTraitSlotMapKey;
        use std::convert::TryInto as _AzleTraitTryInto;
        use std::str::FromStr as _AzleTraitFromStr;
    }
}
