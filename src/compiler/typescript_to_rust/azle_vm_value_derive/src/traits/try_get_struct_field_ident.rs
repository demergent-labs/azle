use proc_macro2::{Ident, Span};
use syn::{Error, Field};

pub trait TryGetStructFieldIdent {
    fn try_get_ident(&self, struct_name: &Ident, field_index: usize) -> Result<&Ident, Error>;
}

impl TryGetStructFieldIdent for Field {
    fn try_get_ident(&self, struct_name: &Ident, field_index: usize) -> Result<&Ident, Error> {
        self.ident.as_ref().ok_or_else(|| {
            Error::new(
                Span::call_site(),
                format!(
                    "Internal Error: expected field {field_index} in \
                        {struct_name} to have a name but received None"
                ),
            )
        })
    }
}
