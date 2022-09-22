use super::{ActDataTypeNode, ToIdent, ToTokenStream};
use proc_macro2::TokenStream;
use quote::quote;

#[derive(Clone, Debug)]
pub struct ActTuple {
    pub name: String,
    pub elems: Vec<ActTupleElem>,
    pub is_inline: bool,
}

#[derive(Clone, Debug)]
pub struct ActTupleElem {
    pub elem_type: ActDataTypeNode,
}

impl ToTokenStream for ActTuple {
    fn to_token_stream(&self) -> TokenStream {
        let type_ident = &self.name.to_ident();
        let elem_idents: Vec<TokenStream> = self
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

impl ToTokenStream for ActTupleElem {
    fn to_token_stream(&self) -> TokenStream {
        if self.elem_type.needs_to_be_boxed() {
            let ident = self.elem_type.get_type_ident();
            quote!(Box<#ident>)
        } else {
            self.elem_type.get_type_ident()
        }
    }
}
