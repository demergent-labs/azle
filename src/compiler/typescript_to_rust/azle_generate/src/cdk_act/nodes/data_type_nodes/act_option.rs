use super::{ActDataType, HasMembers, Literally, ToIdent};
use crate::cdk_act::ToTokenStream;
use proc_macro2::TokenStream;
use quote::{quote, ToTokens};

#[derive(Clone, Debug)]
pub enum ActOption {
    Literal(ActOptionLiteral),
    TypeAlias(ActOptionTypeAlias),
}

#[derive(Clone, Debug)]
pub struct ActOptionLiteral {
    pub enclosed_type: Box<ActDataType>,
}

#[derive(Clone, Debug)]
pub struct ActOptionTypeAlias {
    pub name: String,
    pub enclosed_type: Box<ActDataType>,
}

impl Literally for ActOption {
    fn is_literal(&self) -> bool {
        match self {
            ActOption::Literal(_) => true,
            ActOption::TypeAlias(_) => false,
        }
    }
}

impl HasMembers for ActOption {
    fn get_members(&self) -> Vec<ActDataType> {
        vec![self.get_enclosed_type()]
    }
}

impl ActOption {
    pub fn get_enclosed_type(&self) -> ActDataType {
        match self {
            ActOption::Literal(literal) => *literal.enclosed_type.clone(),
            ActOption::TypeAlias(type_alias) => *type_alias.enclosed_type.clone(),
        }
    }

    pub fn get_name(&self) -> String {
        match self {
            ActOption::Literal(literal) => literal.to_token_stream().to_string(),
            ActOption::TypeAlias(type_alias) => type_alias.name.clone(),
        }
    }
}

impl ToTokenStream for ActOption {
    fn to_token_stream(&self) -> TokenStream {
        match self {
            ActOption::Literal(literal) => literal.to_token_stream(),
            ActOption::TypeAlias(type_alias) => type_alias.to_token_stream(),
        }
    }
}

impl ToTokenStream for ActOptionLiteral {
    fn to_token_stream(&self) -> TokenStream {
        let enclosed_rust_ident = self.enclosed_type.to_token_stream();
        quote!(Option<#enclosed_rust_ident>)
    }
}

impl ToTokenStream for ActOptionTypeAlias {
    fn to_token_stream(&self) -> TokenStream {
        let name = self.name.to_identifier().to_token_stream();
        let enclosed_type = self.enclosed_type.to_token_stream();
        quote!(type #name = Option<#enclosed_type>;)
    }
}
