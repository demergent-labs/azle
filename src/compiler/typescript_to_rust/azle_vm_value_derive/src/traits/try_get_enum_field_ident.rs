use proc_macro2::{Ident, Span};
use syn::{Error, Field};

pub trait TryGetEnumFieldIdent {
    fn try_get_ident(
        &self,
        enum_name: &Ident,
        variant_name: &Ident,
        field_index: usize,
    ) -> Result<&Ident, Error>;
}

impl TryGetEnumFieldIdent for Field {
    fn try_get_ident(
        &self,
        enum_name: &Ident,
        variant_name: &Ident,
        field_index: usize,
    ) -> Result<&Ident, Error> {
        self.ident.as_ref().ok_or_else(|| {
            Error::new(
                Span::call_site(),
                format!(
                    "Internal Error: expected field {field_index} in \
                        {enum_name}::{variant_name} to have a name but received None"
                ),
            )
        })
    }
}
