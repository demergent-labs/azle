use super::{ActDataTypeNode, ToIdent, ToTokenStream};
use proc_macro2::TokenStream;
use quote::{quote, ToTokens};

#[derive(Clone, Debug)]
pub enum ActOption {
    Literal(ActOptionLiteral),
    TypeAlias(ActOptionTypeAlias),
}

#[derive(Clone, Debug)]
pub struct ActOptionLiteral {
    pub enclosed_type: Box<ActDataTypeNode>,
}

#[derive(Clone, Debug)]
pub struct ActOptionTypeAlias {
    pub name: String,
    pub enclosed_type: Box<ActDataTypeNode>,
}

impl ActOption {
    pub fn get_enclosed_type(&self) -> ActDataTypeNode {
        match self {
            ActOption::Literal(literal) => *literal.enclosed_type.clone(),
            ActOption::TypeAlias(type_alias) => *type_alias.enclosed_type.clone(),
        }
    }
}

impl ToTokenStream for ActOptionLiteral {
    fn to_token_stream(&self) -> TokenStream {
        let enclosed_rust_ident = self.enclosed_type.get_type_ident();
        quote!(Option<#enclosed_rust_ident>)
    }
}

impl ToTokenStream for ActOptionTypeAlias {
    fn to_token_stream(&self) -> TokenStream {
        let name = self.name.to_ident().to_token_stream();
        let enclosed_type = self.enclosed_type.get_type_ident();
        quote!(type #name = Option<#enclosed_type>;)
    }
}
