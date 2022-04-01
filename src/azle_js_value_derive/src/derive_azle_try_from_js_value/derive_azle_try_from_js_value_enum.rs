use proc_macro::TokenStream;
use proc_macro2::Ident;
use syn::{
    Data,
    DataEnum,
    DataStruct,
    DeriveInput,
    parse_macro_input
};
use quote::quote;

pub fn derive_azle_try_from_js_value_enum(
    enum_name: Ident,
    data_enum: DataEnum
) -> proc_macro2::TokenStream {
    quote! {}
}