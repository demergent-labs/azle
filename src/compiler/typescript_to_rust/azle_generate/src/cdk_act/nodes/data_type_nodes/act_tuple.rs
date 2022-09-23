use super::{ActDataTypeNode, Literally, ToIdent, TypeAliasize};
use crate::cdk_act::ToTokenStream;
use proc_macro2::TokenStream;
use quote::{quote, ToTokens};

#[derive(Clone, Debug)]
pub enum ActTuple {
    Literal(Tuple),
    TypeAlias(Tuple),
}

#[derive(Clone, Debug)]
pub struct Tuple {
    pub name: String,
    pub elems: Vec<ActTupleElem>,
}

#[derive(Clone, Debug)]
pub struct ActTupleElem {
    pub elem_type: ActDataTypeNode,
}

impl ActTuple {
    pub fn get_name(&self) -> String {
        match self {
            ActTuple::Literal(literal) => literal.name.clone(),
            ActTuple::TypeAlias(type_alias) => type_alias.name.clone(),
        }
    }
}

impl TypeAliasize<ActTuple> for ActTuple {
    fn as_type_alias(&self) -> ActTuple {
        match self {
            ActTuple::Literal(literal) => ActTuple::TypeAlias(literal.clone()),
            ActTuple::TypeAlias(_) => self.clone(),
        }
    }
}

impl Literally for ActTuple {
    fn is_literal(&self) -> bool {
        match self {
            ActTuple::Literal(_) => true,
            ActTuple::TypeAlias(_) => false,
        }
    }

    fn get_members(&self) -> Vec<ActDataTypeNode> {
        let act_tuple = match self {
            ActTuple::Literal(literal) => literal,
            ActTuple::TypeAlias(type_alias) => type_alias,
        };
        act_tuple
            .elems
            .iter()
            .map(|elem| elem.elem_type.clone())
            .collect()
    }
}

impl ToTokenStream for ActTuple {
    fn to_token_stream(&self) -> TokenStream {
        match self {
            ActTuple::Literal(literal) => literal.name.to_identifier().to_token_stream(),
            ActTuple::TypeAlias(type_alias) => {
                let type_ident = type_alias.name.to_identifier();
                let elem_idents: Vec<TokenStream> = type_alias
                    .elems
                    .iter()
                    .map(|elem| elem.to_token_stream())
                    .collect();
                quote!(
                    #[derive(serde::Deserialize, Debug, candid::CandidType, Clone, AzleIntoJsValue, AzleTryFromJsValue)]
                    struct #type_ident (
                        #(#elem_idents),*
                    );
                )
            }
        }
    }
}

impl ToTokenStream for ActTupleElem {
    fn to_token_stream(&self) -> TokenStream {
        if self.elem_type.needs_to_be_boxed() {
            let ident = self.elem_type.to_token_stream();
            quote!(Box<#ident>)
        } else {
            quote!(self.elem_type.to_token_stream())
        }
    }
}
