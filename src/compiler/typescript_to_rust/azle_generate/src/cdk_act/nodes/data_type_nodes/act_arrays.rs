use super::ToTokenStream;
use super::{ActDataTypeNode, ToIdent};
use proc_macro2::TokenStream;
use quote::ToTokens;
use quote::{format_ident, quote};

#[derive(Clone, Debug)]
pub enum ActArray {
    Literal(ActArrayLiteral),
    TypeAlias(ActArrayTypeAlias),
}

#[derive(Clone, Debug)]
pub struct ActArrayLiteral {
    pub enclosed_type: Box<ActDataTypeNode>,
}

#[derive(Clone, Debug)]
pub struct ActArrayTypeAlias {
    pub name: String,
    pub enclosed_type: Box<ActDataTypeNode>,
}

impl ActArray {
    pub fn get_enclosed_type(&self) -> ActDataTypeNode {
        match self {
            ActArray::Literal(literal) => *literal.enclosed_type.clone(),
            ActArray::TypeAlias(type_alias) => *type_alias.enclosed_type.clone(),
        }
    }
}

impl ToTokenStream for ActArrayLiteral {
    fn to_token_stream(&self) -> TokenStream {
        let enclosed_rust_ident = self.enclosed_type.get_type_identifier();
        quote!(Vec<#enclosed_rust_ident>)
    }
}

impl ToTokenStream for ActArrayTypeAlias {
    fn to_token_stream(&self) -> TokenStream {
        let name = self.name.to_identifier().to_token_stream();
        let enclosed_type = self.enclosed_type.get_type_identifier();
        quote!(type #name = Vec<#enclosed_type>;)
    }
}

// TODO do we use this?
impl ToTokenStream for ActArray {
    fn to_token_stream(&self) -> TokenStream {
        match self {
            ActArray::Literal(_) => todo!(),
            ActArray::TypeAlias(type_alias) => type_alias.to_token_stream(),
        }
    }
}
