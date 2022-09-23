use super::{ActDataTypeNode, Literally, ToIdent, ToTokenStream};
use proc_macro2::TokenStream;
use quote::{quote, ToTokens};

#[derive(Clone, Debug)]
pub enum ActRecord {
    Literal(Record),
    TypeAlias(Record),
}

#[derive(Clone, Debug)]
pub struct Record {
    pub name: String,
    pub members: Vec<ActRecordMember>,
}

#[derive(Clone, Debug)]
pub struct ActRecordMember {
    pub member_name: String,
    pub member_type: ActDataTypeNode,
}

impl Literally<ActRecord> for ActRecord {
    fn is_literal(&self) -> bool {
        match self {
            ActRecord::Literal(_) => true,
            ActRecord::TypeAlias(_) => false,
        }
    }

    fn as_type_alias(&self) -> ActRecord {
        match self {
            ActRecord::Literal(literal) => ActRecord::TypeAlias(literal.clone()),
            ActRecord::TypeAlias(_) => self.clone(),
        }
    }

    fn get_literal_members(&self) -> Vec<ActDataTypeNode> {
        self.get_member_types()
            .iter()
            .filter(|member| member.needs_definition())
            .map(|member| member.clone())
            .collect()
    }

    fn get_members(&self) -> Vec<ActDataTypeNode> {
        self.get_member_types()
    }
}

impl ActRecord {
    pub fn get_member_types(&self) -> Vec<ActDataTypeNode> {
        match self {
            ActRecord::Literal(literal) => literal,
            ActRecord::TypeAlias(type_alias) => type_alias,
        }
        .members
        .iter()
        .map(|member| member.member_type.clone())
        .collect()
    }

    pub fn get_name(&self) -> String {
        match self {
            ActRecord::Literal(literal) => literal.name.clone(),
            ActRecord::TypeAlias(type_alias) => type_alias.name.clone(),
        }
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
