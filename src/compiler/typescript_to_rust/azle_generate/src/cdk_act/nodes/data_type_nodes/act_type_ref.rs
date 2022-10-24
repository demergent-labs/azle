use super::{ActDataType, LiteralOrTypeAlias, ToIdent};
use crate::cdk_act::{ToActDataType, ToTokenStream};
use proc_macro2::TokenStream;
use quote::{quote, ToTokens};

#[derive(Clone, Debug)]
pub struct ActTypeRef {
    pub act_type: LiteralOrTypeAlias<ActTypeRefLit, ActTypeRefTypeAlias>,
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

impl ToActDataType for String {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> ActDataType {
        ActDataType::TypeRef(ActTypeRef {
            act_type: match alias_name {
                None => LiteralOrTypeAlias::Literal(ActTypeRefLit { name: self.clone() }),
                Some(name) => LiteralOrTypeAlias::TypeAlias(ActTypeRefTypeAlias {
                    name: name.clone().clone(),
                    aliased_type: ActTypeRefLit { name: self.clone() },
                }),
            },
        })
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
