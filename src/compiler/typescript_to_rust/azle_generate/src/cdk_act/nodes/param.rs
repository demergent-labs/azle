use crate::cdk_act::{ActDataTypeNode, ToTokenStream};
use proc_macro2::{Ident, TokenStream};

#[derive(Clone)]
pub struct Param {
    pub name: Ident,
    pub data_type: ActDataTypeNode,
}

impl ToTokenStream for Param {
    fn to_token_stream(&self) -> TokenStream {
        let name = &self.name;
        let data_type = &self.data_type.to_token_stream();
        quote::quote! {
            #name: #data_type
        }
    }
}
