use super::{ActDataType, Literally, ToIdent};
use crate::cdk_act::{ToActDataType, ToTokenStream};
use proc_macro2::TokenStream;
use quote::{quote, ToTokens};

#[derive(Clone, Debug)]
pub enum ActPrimitive {
    Literal(ActPrimitiveLit),
    TypeAlias(ActPrimitiveTypeAlias),
}

#[derive(Clone, Debug)]
pub enum ActPrimitiveLit {
    Bool,
    Blob,
    Empty,
    Float32,
    Float64,
    Int,
    Int8,
    Int16,
    Int32,
    Int64,
    Nat,
    Nat8,
    Nat16,
    Nat32,
    Nat64,
    Null,
    Principal,
    Reserved,
    String,
    Void,
}

impl ToActDataType for ActPrimitiveLit {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> ActDataType {
        let primitive = match alias_name {
            None => ActPrimitive::Literal(self.clone()),
            Some(name) => ActPrimitive::TypeAlias(ActPrimitiveTypeAlias {
                name: name.clone().clone(),
                aliased_type: self.clone(),
            }),
        };
        ActDataType::Primitive(primitive)
    }
}

#[derive(Clone, Debug)]
pub struct ActPrimitiveTypeAlias {
    pub name: String,
    pub aliased_type: ActPrimitiveLit,
}

impl ActPrimitive {
    pub fn get_name(&self) -> String {
        match self {
            ActPrimitive::Literal(literal) => literal.to_token_stream().to_string(),
            ActPrimitive::TypeAlias(type_alias) => type_alias.name.clone(),
        }
    }
}

impl Literally for ActPrimitive {
    fn is_literal(&self) -> bool {
        match self {
            ActPrimitive::Literal(_) => true,
            ActPrimitive::TypeAlias(_) => false,
        }
    }
}

impl ToTokenStream for ActPrimitive {
    fn to_token_stream(&self) -> TokenStream {
        match self {
            ActPrimitive::Literal(literal) => literal.to_token_stream(),
            ActPrimitive::TypeAlias(type_alias) => type_alias.to_token_stream(),
        }
    }
}

impl ToTokenStream for ActPrimitiveTypeAlias {
    fn to_token_stream(&self) -> TokenStream {
        let name = self.name.to_identifier().to_token_stream();
        let alias = self.aliased_type.to_token_stream();
        quote!(type #name = #alias;)
    }
}

impl ToTokenStream for ActPrimitiveLit {
    fn to_token_stream(&self) -> TokenStream {
        match self {
            ActPrimitiveLit::Bool => quote!(bool),
            ActPrimitiveLit::Blob => quote!(Vec<u8>),
            ActPrimitiveLit::Empty => quote!(candid::Empty),
            ActPrimitiveLit::Float32 => quote!(f32),
            ActPrimitiveLit::Float64 => quote!(f64),
            ActPrimitiveLit::Int => quote!(candid::Int),
            ActPrimitiveLit::Int8 => quote!(i8),
            ActPrimitiveLit::Int16 => quote!(i16),
            ActPrimitiveLit::Int32 => quote!(i32),
            ActPrimitiveLit::Int64 => quote!(i64),
            ActPrimitiveLit::Nat => quote!(candid::Nat),
            ActPrimitiveLit::Nat8 => quote!(u8),
            ActPrimitiveLit::Nat16 => quote!(u16),
            ActPrimitiveLit::Nat32 => quote!(u32),
            ActPrimitiveLit::Nat64 => quote!(u64),
            ActPrimitiveLit::Null => quote! {(())},
            ActPrimitiveLit::Principal => quote!(candid::Principal),
            ActPrimitiveLit::Reserved => quote!(candid::Reserved),
            ActPrimitiveLit::String => quote!(String),
            ActPrimitiveLit::Void => quote! {()},
        }
    }
}
