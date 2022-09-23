use super::{ActDataTypeNode, ToIdent};
use super::{Literally, ToTokenStream};
use proc_macro2::TokenStream;
use quote::{quote, ToTokens};

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

impl Literally<ActArray> for ActArray {
    // TODO this is an example of a literal that does not need to be defined. It's literal member will need to be though
    fn is_literal(&self) -> bool {
        match self {
            ActArray::Literal(_) => true,
            ActArray::TypeAlias(_) => false,
        }
    }

    fn as_type_alias(&self) -> ActArray {
        match self {
            ActArray::Literal(_) => {
                // TODO if this is truly the case then we should have this in a different trait that only those that can will implement
                panic!("Array literals should never need to be converted to type aliases")
            }
            ActArray::TypeAlias(_) => self.clone(),
        }
    }

    fn get_literal_members(&self) -> Vec<ActDataTypeNode> {
        vec![self.get_enclosed_type()]
            .iter()
            .filter(|enclosed_type| enclosed_type.needs_definition())
            .cloned()
            .collect()
    }

    fn get_members(&self) -> Vec<ActDataTypeNode> {
        vec![self.get_enclosed_type()]
    }
}

impl ActArray {
    pub fn get_enclosed_type(&self) -> ActDataTypeNode {
        match self {
            ActArray::Literal(literal) => *literal.enclosed_type.clone(),
            ActArray::TypeAlias(type_alias) => *type_alias.enclosed_type.clone(),
        }
    }

    pub fn get_name(&self) -> String {
        match self {
            ActArray::Literal(literal) => literal.to_token_stream().to_string(),
            ActArray::TypeAlias(type_alias) => type_alias.name.clone(),
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

impl ToTokenStream for ActArray {
    fn to_token_stream(&self) -> TokenStream {
        match self {
            ActArray::Literal(literal) => literal.to_token_stream(),
            ActArray::TypeAlias(type_alias) => type_alias.to_token_stream(),
        }
    }
}
