use super::{act_data_type_node::ActAliasedType, ToIdent, ToTokenStream};
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
    pub aliased_type: ActAliasedType,
}

impl ToTokenStream for ActTypeRefTypeAlias {
    fn to_token_stream(&self) -> TokenStream {
        let name = self.name.to_ident().to_token_stream();
        let alias = self.aliased_type.to_token_stream();
        quote!(type #name = #alias;)
    }
}
