use super::{ActDataTypeNode, ToIdent, ToTokenStream};
use proc_macro2::TokenStream;
use quote::{quote, ToTokens};

#[derive(Clone, Debug)]
pub enum ActRecord {
    Literal(ActRecordLiteral),
    TypeAlias(ActRecordTypeAlias),
}

#[derive(Clone, Debug)]
pub struct ActRecordLiteral {
    pub name: String,
    pub members: Vec<ActRecordMember>,
}

#[derive(Clone, Debug)]
pub struct ActRecordTypeAlias {
    pub name: String,
    pub members: Vec<ActRecordMember>,
}

#[derive(Clone, Debug)]
pub struct ActRecordMember {
    pub member_name: String,
    pub member_type: ActDataTypeNode,
}

impl ActRecord {
    pub fn is_literal(&self) -> bool {
        match self {
            ActRecord::Literal(_) => true,
            ActRecord::TypeAlias(_) => false,
        }
    }

    pub fn as_type_alias(&self) -> ActRecord {
        match self {
            ActRecord::Literal(literal) => ActRecord::TypeAlias(ActRecordTypeAlias {
                name: literal.name.clone(),
                members: literal.members.clone(),
            }),
            ActRecord::TypeAlias(_) => self.clone(),
        }
    }

    pub fn get_member_types(&self) -> Vec<ActDataTypeNode> {
        let members = match self {
            ActRecord::Literal(literal) => literal.members.clone(),
            ActRecord::TypeAlias(type_alias) => type_alias.members.clone(),
        };
        members
            .iter()
            .map(|member| member.member_type.clone())
            .collect()
    }
}

impl ToTokenStream for ActRecord {
    fn to_token_stream(&self) -> TokenStream {
        match self {
            ActRecord::Literal(literal) => literal.name.to_identifier().to_token_stream(),
            ActRecord::TypeAlias(type_alias) => {
                let type_ident = type_alias.name.to_identifier();
                let member_token_streams: Vec<TokenStream> = type_alias
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
