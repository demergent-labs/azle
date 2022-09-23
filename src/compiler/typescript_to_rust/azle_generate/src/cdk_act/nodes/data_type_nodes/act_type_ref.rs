use super::{Literally, ToIdent, ToTokenStream};
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

impl Literally<ActTypeRef> for ActTypeRef {
    fn is_literal(&self) -> bool {
        match self {
            ActTypeRef::Literal(_) => true,
            ActTypeRef::TypeAlias(_) => false,
        }
    }

    fn as_type_alias(&self) -> ActTypeRef {
        match self {
            ActTypeRef::Literal(_) => todo!(),
            ActTypeRef::TypeAlias(_) => self.clone(),
        }
    }

    fn get_literal_members(&self) -> Vec<super::ActDataTypeNode> {
        vec![]
    }

    fn get_members(&self) -> Vec<super::ActDataTypeNode> {
        vec![]
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
