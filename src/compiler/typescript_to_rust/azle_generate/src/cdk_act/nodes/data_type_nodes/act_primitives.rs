use super::{ToIdent, ToTokenStream};
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

#[derive(Clone, Debug)]
pub struct ActPrimitiveTypeAlias {
    pub name: String,
    pub aliased_type: ActPrimitiveLit,
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
