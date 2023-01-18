use proc_macro2::{Ident, TokenStream};

pub fn generate(wrapper_type_name: &Ident) -> TokenStream {
    quote::quote! {
        impl Storable for #wrapper_type_name {
            fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
                Cow::Owned(candid::Encode!(self).unwrap())
            }

            fn from_bytes(bytes: Vec<u8>) -> Self {
                candid::Decode!(&bytes, Self).unwrap()
            }
        }
    }
}
