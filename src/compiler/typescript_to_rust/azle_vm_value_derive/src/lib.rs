use proc_macro::TokenStream;
use proc_macro2::Span;
use syn::{parse_macro_input, Data, DeriveInput, Error};

use derive_try_from_vm_value::{derive_try_from_vm_value_enum, derive_try_from_vm_value_struct};
use derive_try_into_vm_value::{derive_try_into_vm_value_enum, derive_try_into_vm_value_struct};

mod derive_try_from_vm_value;
mod derive_try_into_vm_value;
mod traits;

#[proc_macro_derive(CdkActTryIntoVmValue)]
pub fn derive_azle_try_into_vm_value(tokens: TokenStream) -> TokenStream {
    let input = parse_macro_input!(tokens as DeriveInput);

    let name = input.ident;
    let generics = input.generics;

    let generated_code = match input.data {
        Data::Enum(data_enum) => {
            derive_try_into_vm_value_enum::generate(&name, &data_enum, &generics)
        }
        Data::Struct(data_struct) => {
            derive_try_into_vm_value_struct::generate(&name, &data_struct, &generics)
        }
        Data::Union(_) => Err(Error::new(
            Span::call_site(),
            format!("CdkActTryIntoVmValue not supported for unions"),
        )),
    };

    match generated_code {
        Ok(code) => TokenStream::from(code),
        Err(err) => err.to_compile_error().into(),
    }
}

#[proc_macro_derive(CdkActTryFromVmValue)]
pub fn derive_azle_try_from_vm_value(tokens: TokenStream) -> TokenStream {
    let input = parse_macro_input!(tokens as DeriveInput);

    let name = input.ident;
    let generics = input.generics;

    let generated_code = match input.data {
        Data::Enum(data_enum) => {
            derive_try_from_vm_value_enum::generate(&name, &data_enum, &generics)
        }
        Data::Struct(data_struct) => {
            derive_try_from_vm_value_struct::generate(&name, &data_struct, &generics)
        }
        Data::Union(_) => Err(Error::new(
            Span::call_site(),
            format!("CdkActTryFromVmValue not supported for unions"),
        )),
    };

    match generated_code {
        Ok(code) => TokenStream::from(code),
        Err(err) => err.to_compile_error().into(),
    }
}
