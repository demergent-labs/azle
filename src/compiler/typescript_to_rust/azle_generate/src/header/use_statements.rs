pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        use azle_vm_value_derive::{CdkActTryIntoVmValue, CdkActTryFromVmValue};
        use candid::{Decode, Encode};
        use ic_cdk::api::call::CallResult;
        use std::str::FromStr as _FromStrTrait;

        use crate::vm_value_conversion::{
            CdkActTryIntoVmValue,
            CdkActTryFromVmValue,
            CdkActTryIntoVmValueError,
            CdkActTryFromVmValueError
        };
    }
}
