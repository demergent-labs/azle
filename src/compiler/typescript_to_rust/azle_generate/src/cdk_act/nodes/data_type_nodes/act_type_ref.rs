use super::{ActDataType, Literally, ToIdent};
use crate::cdk_act::{ToActDataType, ToTokenStream};
use proc_macro2::TokenStream;
use quote::{quote, ToTokens};

#[derive(Clone, Debug)]
pub enum ActTypeRef {
    Literal(ActTypeRefLit),
    TypeAlias(ActTypeRefTypeAlias),
}

#[derive(Clone, Debug)]
pub struct ActTypeRefLit {
    pub name: String,
}

#[derive(Clone, Debug)]
pub struct ActTypeRefTypeAlias {
    pub name: String,
    pub aliased_type: ActTypeRefLit,
}

impl ActTypeRef {
    pub fn get_name(&self) -> String {
        match self {
            ActTypeRef::Literal(literal) => literal.name.clone(),
            ActTypeRef::TypeAlias(type_alias) => type_alias.name.clone(),
        }
    }
}

impl Literally for ActTypeRef {
    fn is_literal(&self) -> bool {
        match self {
            ActTypeRef::Literal(_) => true,
            ActTypeRef::TypeAlias(_) => false,
        }
    }
}

impl ToActDataType for String {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> ActDataType {
        let type_ref = match alias_name {
            None => ActTypeRef::Literal(ActTypeRefLit { name: self.clone() }),
            Some(name) => ActTypeRef::TypeAlias(ActTypeRefTypeAlias {
                name: name.clone().clone(),
                aliased_type: ActTypeRefLit { name: self.clone() },
            }),
        };
        ActDataType::TypeRef(type_ref)
    }
}

impl ToTokenStream for ActTypeRef {
    fn to_token_stream(&self) -> TokenStream {
        match self {
            ActTypeRef::Literal(literal) => literal.to_token_stream(),
            ActTypeRef::TypeAlias(type_alias) => type_alias.to_token_stream(),
        }
    }
}

impl ToTokenStream for ActTypeRefLit {
    fn to_token_stream(&self) -> TokenStream {
        self.name.to_identifier().to_token_stream()
    }
}

impl ToTokenStream for ActTypeRefTypeAlias {
    fn to_token_stream(&self) -> TokenStream {
        let name = self.name.to_identifier().to_token_stream();
        let alias = self.aliased_type.to_token_stream();
        quote!(type #name = #alias;)
    }
}
