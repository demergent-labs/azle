mod derive_azle_into_js_value {
    pub mod derive_azle_into_js_value_enum;
    pub mod derive_azle_into_js_value_struct;
}
mod derive_azle_try_from_js_value {
    pub mod derive_azle_try_from_js_value_enum;
    pub mod derive_azle_try_from_js_value_struct;
}

use proc_macro::TokenStream;
use syn::{
    Data,
    DeriveInput,
    parse_macro_input
};
use derive_azle_into_js_value::{
    derive_azle_into_js_value_enum::derive_azle_into_js_value_enum,
    derive_azle_into_js_value_struct::derive_azle_into_js_value_struct
};
use derive_azle_try_from_js_value::{
    derive_azle_try_from_js_value_enum::derive_azle_try_from_js_value_enum,
    derive_azle_try_from_js_value_struct::derive_azle_try_from_js_value_struct
};

#[proc_macro_derive(AzleIntoJsValue)]
pub fn derive_azle_into_js_value(tokens: TokenStream) -> TokenStream {
    let input = parse_macro_input!(tokens as DeriveInput);

    let name = input.ident;

    let generated_code = match input.data {
        Data::Enum(data_enum) => derive_azle_into_js_value_enum(
            &name,
            &data_enum
        ),
        Data::Struct(data_struct) => derive_azle_into_js_value_struct(
            &name,
            &data_struct
        ),
        _ => panic!("Can only derive from Structs or Enums")
    };

    TokenStream::from(generated_code)
}

#[proc_macro_derive(AzleTryFromJsValue)]
pub fn derive_azle_try_from_js_value(tokens: TokenStream) -> TokenStream {
    let input = parse_macro_input!(tokens as DeriveInput);

    let name = input.ident;

    let generated_code = match input.data {
        Data::Enum(data_enum) => derive_azle_try_from_js_value_enum(
            &name,
            &data_enum
        ),
        Data::Struct(data_struct) => derive_azle_try_from_js_value_struct(
            &name,
            &data_struct
        ),
        _ => panic!("Can only derive from Structs or Enums")
    };

    TokenStream::from(generated_code)
}