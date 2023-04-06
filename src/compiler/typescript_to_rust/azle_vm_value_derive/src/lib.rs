mod derive_try_into_vm_value {
    pub mod derive_try_into_vm_value_enum;
    pub mod derive_try_into_vm_value_struct;
}
mod derive_try_from_vm_value {
    pub mod derive_try_from_vm_value_enum;
    pub mod derive_try_from_vm_value_struct;
}

use derive_try_from_vm_value::{
    derive_try_from_vm_value_enum::derive_try_from_vm_value_enum,
    derive_try_from_vm_value_struct::derive_try_from_vm_value_struct,
};
use derive_try_into_vm_value::{
    derive_try_into_vm_value_enum::derive_try_into_vm_value_enum,
    derive_try_into_vm_value_struct::derive_try_into_vm_value_struct,
};
use proc_macro::TokenStream;
use syn::{parse_macro_input, Data, DeriveInput};

#[proc_macro_derive(CdkActTryIntoVmValue)]
pub fn derive_azle_try_into_vm_value(tokens: TokenStream) -> TokenStream {
    let input = parse_macro_input!(tokens as DeriveInput);

    let name = input.ident;
    let generics = input.generics;

    let generated_code = match input.data {
        Data::Enum(data_enum) => derive_try_into_vm_value_enum(&name, &data_enum, &generics),
        Data::Struct(data_struct) => {
            derive_try_into_vm_value_struct(&name, &data_struct, &generics)
        }
        _ => panic!("Can only derive from Structs or Enums"),
    };

    TokenStream::from(generated_code)
}
#[proc_macro_derive(CdkActTryFromVmValue)]
pub fn derive_azle_try_from_vm_value(tokens: TokenStream) -> TokenStream {
    let input = parse_macro_input!(tokens as DeriveInput);

    let name = input.ident;
    let generics = input.generics;

    let generated_code = match input.data {
        Data::Enum(data_enum) => derive_try_from_vm_value_enum(&name, &data_enum, &generics),
        Data::Struct(data_struct) => {
            derive_try_from_vm_value_struct(&name, &data_struct, &generics)
        }
        _ => panic!("Can only derive from Structs or Enums"),
    };

    TokenStream::from(generated_code)
}
