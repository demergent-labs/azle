use super::ToTokenStream;
use super::{ActDataTypeNode, ToIdent};
use proc_macro2::TokenStream;
use quote::quote;
use quote::ToTokens;

#[derive(Clone, Debug)]
pub enum ActArray {
    Literal(ActArrayLiteral),
    TypeAlias(ActArrayTypeAlias),
}

#[derive(Clone, Debug)]
pub struct ActArrayLiteral {
    pub token_stream: TokenStream,
    pub enclosed_inline_type: Box<Option<ActDataTypeNode>>,
}

#[derive(Clone, Debug)]
pub struct ActArrayTypeAlias {
    pub name: String,
    pub aliased_type: TokenStream,
    pub enclosed_inline_type: Box<Option<ActDataTypeNode>>,
}

impl ToTokenStream for ActArray {
    fn to_token_stream(&self) -> TokenStream {
        match self {
            ActArray::Literal(_) => todo!(),
            ActArray::TypeAlias(type_alias) => type_alias.to_token_stream(),
        }
    }
}

impl ToTokenStream for ActArrayTypeAlias {
    fn to_token_stream(&self) -> TokenStream {
        let name = &self.name.to_ident().to_token_stream();
        let aliased_type = &self.aliased_type;
        quote!(type #name = #aliased_type;)
    }
}
