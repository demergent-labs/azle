use super::{ActDataTypeNode, ToIdent, ToTokenStream};
use proc_macro2::TokenStream;
use quote::quote;

// TODO replace is_inline with literal vs type alias
#[derive(Clone, Debug)]
pub struct ActVariant {
    pub name: String,
    pub members: Vec<ActVariantMember>,
    pub is_inline: bool,
}

#[derive(Clone, Debug)]
pub struct ActVariantMember {
    pub member_name: String,
    pub member_type: ActDataTypeNode,
}

impl ToTokenStream for ActVariant {
    fn to_token_stream(&self) -> TokenStream {
        let type_ident = &self.name.to_ident();
        let member_token_streams: Vec<TokenStream> = self
            .members
            .iter()
            .map(|member| member.to_token_stream())
            .collect();
        quote!(
            #[derive(serde::Deserialize, Debug, candid::CandidType, Clone, AzleIntoJsValue, AzleTryFromJsValue)]
            enum #type_ident {
                #(#member_token_streams),*
            }
        )
    }
}

impl ToTokenStream for ActVariantMember {
    fn to_token_stream(&self) -> TokenStream {
        let member_type_token_stream = match self.member_type.clone() {
            ActDataTypeNode::Primitive(_) => {
                if self.member_type.get_type_ident().to_string() == quote!((())).to_string() {
                    quote!()
                } else {
                    let member_type_token_stream = self.member_type.get_type_ident();
                    quote!((#member_type_token_stream))
                }
            }
            _ => {
                let member_type_token_stream = if self.member_type.needs_to_be_boxed() {
                    let ident = self.member_type.get_type_ident();
                    quote!(Box<#ident>)
                } else {
                    self.member_type.get_type_ident()
                };
                quote!((#member_type_token_stream))
            }
        };
        let member_name = &self.member_name.to_ident();
        quote! {#member_name#member_type_token_stream}
    }
}
