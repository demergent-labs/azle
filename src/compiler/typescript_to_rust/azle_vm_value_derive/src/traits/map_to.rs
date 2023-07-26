use proc_macro2::{Ident, TokenStream};
use quote::format_ident;
use syn::{Error, Field};

use crate::traits::TryGetEnumFieldIdent;

pub trait MapTo {
    fn map_to<T>(
        &self,
        enum_name: &Ident,
        variant_name: &Ident,
        callback: T,
    ) -> Result<Vec<TokenStream>, Error>
    where
        T: Fn(&Ident, Ident) -> TokenStream;
}

impl MapTo for Vec<&Field> {
    fn map_to<T>(
        &self,
        enum_name: &Ident,
        variant_name: &Ident,
        callback: T,
    ) -> Result<Vec<TokenStream>, Error>
    where
        T: Fn(&Ident, Ident) -> TokenStream,
    {
        let named_field_js_value_result_variable_names = self
            .iter()
            .enumerate()
            .map(|(field_index, named_field)| -> Result<TokenStream, Error> {
                let field_name = named_field.try_get_ident(enum_name, variant_name, field_index)?;
                let variable_name = format_ident!("{}_js_value_result", field_name);

                Ok(callback(&field_name, variable_name))
            })
            .collect::<Result<Vec<_>, _>>();

        named_field_js_value_result_variable_names
    }
}
