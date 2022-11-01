use super::{ActDataType, HasMembers, LiteralOrTypeAlias, ToIdent, TypeAliasize};
use crate::cdk_act::ToTokenStream;
use proc_macro2::TokenStream;
use quote::{quote, ToTokens};

#[derive(Clone, Debug)]
pub struct ActTuple {
    pub act_type: LiteralOrTypeAlias<TupleLiteral, TupleTypeAlias>,
}

#[derive(Clone, Debug)]
pub struct TupleLiteral {
    pub tuple: Tuple,
}

#[derive(Clone, Debug)]
pub struct TupleTypeAlias {
    pub tuple: Tuple,
}

#[derive(Clone, Debug)]
pub struct Tuple {
    pub name: String,
    pub elems: Vec<ActTupleElem>,
}

#[derive(Clone, Debug)]
pub struct ActTupleElem {
    pub elem_type: ActDataType,
}

impl TypeAliasize<ActTuple> for ActTuple {
    fn as_type_alias(&self) -> ActTuple {
        ActTuple {
            act_type: match &self.act_type {
                LiteralOrTypeAlias::Literal(literal) => {
                    LiteralOrTypeAlias::TypeAlias(TupleTypeAlias {
                        tuple: literal.tuple.clone(),
                    })
                }
                LiteralOrTypeAlias::TypeAlias(_) => self.act_type.clone(),
            },
        }
    }
}

impl HasMembers for ActTuple {
    fn get_members(&self) -> Vec<ActDataType> {
        match &self.act_type {
            LiteralOrTypeAlias::Literal(literal) => &literal.tuple,
            LiteralOrTypeAlias::TypeAlias(type_alias) => &type_alias.tuple,
        }
        .elems
        .iter()
        .map(|elem| elem.elem_type.clone())
        .collect()
    }
}

impl ToTokenStream for TupleLiteral {
    fn to_token_stream(&self) -> TokenStream {
        self.tuple.name.to_identifier().to_token_stream()
    }
}

impl ToTokenStream for TupleTypeAlias {
    fn to_token_stream(&self) -> TokenStream {
        let type_ident = self.tuple.name.to_identifier();
        let elem_idents: Vec<TokenStream> = self
            .tuple
            .elems
            .iter()
            .map(|elem| elem.to_token_stream())
            .collect();

        let elem_idents = if elem_idents.len() == 1 {
            let elem_ident = &elem_idents[0];
            quote!((#elem_ident,))
        } else {
            quote!(#(#elem_idents),*)
        };

        quote!(
            #[derive(serde::Deserialize, Debug, candid::CandidType, Clone, CdkActTryIntoVmValue, CdkActTryFromVmValue)]
            struct #type_ident (
                #elem_idents
            );
        )
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
