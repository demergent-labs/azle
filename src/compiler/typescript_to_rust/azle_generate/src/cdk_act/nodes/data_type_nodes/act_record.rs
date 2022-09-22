use super::{ActDataTypeNode, ToIdent, ToTokenStream};
use proc_macro2::TokenStream;
use quote::quote;

#[derive(Clone, Debug)]
pub struct ActRecord {
    pub name: String,
    pub members: Vec<ActRecordMember>,
    pub is_inline: bool,
}

#[derive(Clone, Debug)]
pub struct ActRecordMember {
    pub member_name: String,
    pub member_type: ActDataTypeNode,
}

impl ToTokenStream for ActRecord {
    fn to_token_stream(&self) -> TokenStream {
        let type_ident = &self.name.to_identifier();
        let member_token_streams: Vec<TokenStream> = self
            .members
            .iter()
            .map(|member| member.to_token_stream())
            .collect();
        quote!(
            #[derive(serde::Deserialize, Debug, candid::CandidType, Clone, AzleIntoJsValue, AzleTryFromJsValue)]
            struct #type_ident {
                #(#member_token_streams),*
            }
        )
    }
}

impl ToTokenStream for ActRecordMember {
    fn to_token_stream(&self) -> TokenStream {
        let member_type_token_stream = if self.member_type.needs_to_be_boxed() {
            let ident = self.member_type.get_type_identifier();
            quote!(Box<#ident>)
        } else {
            quote!(self.member_type.get_type_identifier())
        };
        let member_name = &self.member_name.to_identifier();
        quote!(#member_name: #member_type_token_stream)
    }
}
