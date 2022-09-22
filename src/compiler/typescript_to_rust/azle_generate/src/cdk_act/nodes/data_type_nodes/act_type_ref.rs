use super::{ToIdent, ToTokenStream};
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
