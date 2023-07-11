use proc_macro2::{Ident, TokenStream};

pub fn generate(wrapper_type_name: &Ident) -> TokenStream {
    quote::quote! {
        impl ic_stable_structures::Storable for #wrapper_type_name {
            fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
                std::borrow::Cow::Owned(candid::Encode!(self).unwrap_or_else(|candid_error| {
                    ic_cdk::trap(format!("CandidError: {}", candid_error.to_string()).as_str())
                }))
            }

            fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
                candid::Decode!(&bytes, Self).unwrap_or_else(|candid_error| {
                    ic_cdk::trap(format!("CandidError: {}", candid_error.to_string()).as_str())
                })
            }
        }
    }
}
