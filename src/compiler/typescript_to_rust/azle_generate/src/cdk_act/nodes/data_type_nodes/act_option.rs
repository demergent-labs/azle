use super::{ActDataTypeNode, Literally, ToIdent, ToTokenStream};
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

impl Literally<ActOption> for ActOption {
    fn is_literal(&self) -> bool {
        match self {
            ActOption::Literal(_) => true,
            ActOption::TypeAlias(_) => false,
        }
    }

    fn as_type_alias(&self) -> ActOption {
        match self {
            // TODO if this is truly the case then we should have this in a different trait that only those that can will implement
            ActOption::Literal(_) => {
                panic!("Option literals should never need to be converted to type aliases")
            }
            ActOption::TypeAlias(_) => self.clone(),
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

impl ActOption {
    pub fn get_enclosed_type(&self) -> ActDataTypeNode {
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
        let enclosed_rust_ident = self.enclosed_type.get_type_identifier();
        quote!(Option<#enclosed_rust_ident>)
    }
}

impl ToTokenStream for ActOptionTypeAlias {
    fn to_token_stream(&self) -> TokenStream {
        let name = self.name.to_identifier().to_token_stream();
        let enclosed_type = self.enclosed_type.get_type_identifier();
        quote!(type #name = Option<#enclosed_type>;)
    }
}
