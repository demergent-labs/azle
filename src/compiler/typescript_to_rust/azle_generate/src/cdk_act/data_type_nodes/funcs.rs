use super::{ActDataTypeNode, ToIdent, ToTokenStream};
use crate::generators::funcs;
use proc_macro2::TokenStream;

#[derive(Clone, Debug)]
pub struct ActFunc {
    pub name: String,
    pub params: Vec<ActDataTypeNode>,
    pub return_type: Box<ActDataTypeNode>,
    pub param_strings: Vec<String>,
    pub return_string: String,
    pub mode: String,
    pub is_inline: bool,
}

impl ToTokenStream for ActFunc {
    fn to_token_stream(&self) -> TokenStream {
        funcs::generate_func_struct_and_impls(
            &self.name.to_ident(),
            &self.mode,
            &self.param_strings,
            &self.return_string,
        )
    }
}
