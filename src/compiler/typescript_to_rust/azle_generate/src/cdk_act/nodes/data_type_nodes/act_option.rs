use super::{ActDataType, HasMembers, LiteralOrTypeAlias, ToIdent};
use crate::cdk_act::ToTokenStream;
use proc_macro2::TokenStream;
use quote::{quote, ToTokens};

#[derive(Clone, Debug)]
pub struct ActOption {
    pub act_type: LiteralOrTypeAlias<ActOptionLiteral, ActOptionTypeAlias>,
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

impl HasMembers for ActOption {
    fn get_members(&self) -> Vec<ActDataType> {
        vec![self.get_enclosed_type()]
    }
}

impl ActOption {
    pub fn get_enclosed_type(&self) -> ActDataType {
        match &self.act_type {
            LiteralOrTypeAlias::Literal(literal) => *literal.enclosed_type.clone(),
            LiteralOrTypeAlias::TypeAlias(type_alias) => *type_alias.enclosed_type.clone(),
        }
    }
}

impl ToTokenStream for ActOption {
    fn to_token_stream(&self) -> TokenStream {
        match &self.act_type {
            LiteralOrTypeAlias::Literal(literal) => literal.to_token_stream(),
            LiteralOrTypeAlias::TypeAlias(type_alias) => type_alias.to_token_stream(),
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
