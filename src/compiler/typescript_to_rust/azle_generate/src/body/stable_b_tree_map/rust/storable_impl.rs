use proc_macro2::{Ident, TokenStream};

pub fn generate(wrapper_type_name: &Ident) -> TokenStream {
    quote::quote! {
        impl ic_stable_structures::Storable for #wrapper_type_name {
            fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
                unwrap_or_trap(|| {
                    Ok(std::borrow::Cow::Owned(candid::Encode!(self).map_err(
                        |candid_error| {
                            RuntimeError::String(format!(
                                "CandidError: {}",
                                candid_error.to_string()
                            ))
                        },
                    )?))
                })
            }

            fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
                unwrap_or_trap(|| {
                    candid::Decode!(&bytes, Self).map_err(|candid_error| {
                        RuntimeError::String(format!("CandidError: {}", candid_error.to_string()))
                    })
                })
            }
        }
    }
}
