use super::{ActDataTypeNode, Literally, ToIdent, ToTokenStream};
use proc_macro2::TokenStream;
use quote::{quote, ToTokens};

#[derive(Clone, Debug)]
pub enum ActVariant {
    Literal(Variant),
    TypeAlias(Variant),
}

#[derive(Clone, Debug)]
pub struct Variant {
    pub name: String,
    pub members: Vec<ActVariantMember>,
}

#[derive(Clone, Debug)]
pub struct ActVariantMember {
    pub member_name: String,
    pub member_type: ActDataTypeNode,
}

impl Literally<ActVariant> for ActVariant {
    fn is_literal(&self) -> bool {
        match self {
            ActVariant::Literal(_) => true,
            ActVariant::TypeAlias(_) => false,
        }
    }

    fn as_type_alias(&self) -> ActVariant {
        match self {
            ActVariant::Literal(literal) => ActVariant::TypeAlias(literal.clone()),
            ActVariant::TypeAlias(_) => self.clone(),
        }
    }

    fn get_literal_members(&self) -> Vec<ActDataTypeNode> {
        let act_variant = match self {
            ActVariant::Literal(literal) => literal.clone(),
            ActVariant::TypeAlias(type_alias) => type_alias.clone(),
        };
        act_variant
            .members
            .iter()
            .filter(|member| member.member_type.is_inline_type())
            .map(|member| member.member_type.clone())
            .collect()
    }
}

impl ToTokenStream for ActVariant {
    fn to_token_stream(&self) -> TokenStream {
        match self {
            ActVariant::Literal(literal) => literal.name.to_identifier().to_token_stream(),
            ActVariant::TypeAlias(type_alias) => {
                let type_ident = type_alias.name.to_identifier();
                let member_token_streams: Vec<TokenStream> = type_alias
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
    }
}

impl ToTokenStream for ActVariantMember {
    fn to_token_stream(&self) -> TokenStream {
        let member_type_token_stream = match self.member_type.clone() {
            ActDataTypeNode::Primitive(_) => {
                if self.member_type.get_type_identifier().to_string() == quote!((())).to_string() {
                    quote!()
                } else {
                    let member_type_token_stream = self.member_type.get_type_identifier();
                    quote!((#member_type_token_stream))
                }
            }
            _ => {
                let member_type_token_stream = if self.member_type.needs_to_be_boxed() {
                    let ident = self.member_type.get_type_identifier();
                    quote!(Box<#ident>)
                } else {
                    quote!(self.member_type.get_type_identifier())
                };
                quote!((#member_type_token_stream))
            }
        };
        let member_name = &self.member_name.to_identifier();
        quote! {#member_name#member_type_token_stream}
    }
}
