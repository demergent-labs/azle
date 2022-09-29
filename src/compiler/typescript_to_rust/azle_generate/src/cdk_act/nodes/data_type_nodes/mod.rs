pub use act_arrays::{ActArray, ActArrayLiteral, ActArrayTypeAlias};
pub use act_data_type::{build_inline_type_acts, deduplicate, ActDataType};
pub use act_funcs::{generate_func_arg_token, ActFunc};
pub use act_option::{ActOption, ActOptionLiteral, ActOptionTypeAlias};
pub use act_primitives::{ActPrimitive, ActPrimitiveLit, ActPrimitiveTypeAlias};
pub use act_record::{ActRecord, ActRecordMember};
pub use act_tuple::{ActTuple, ActTupleElem};
pub use act_type_ref::{ActTypeRef, ActTypeRefLit, ActTypeRefTypeAlias};
pub use act_variants::{ActVariant, ActVariantMember};
use proc_macro2::Ident;
use quote::format_ident;

use crate::cdk_act::ToTokenStream;

pub mod act_arrays;
pub mod act_data_type;
pub mod act_funcs;
pub mod act_option;
pub mod act_primitives;
pub mod act_record;
pub mod act_tuple;
pub mod act_type_ref;
pub mod act_variants;

pub trait ToIdent {
    fn to_identifier(&self) -> Ident;
}

impl ToIdent for String {
    fn to_identifier(&self) -> Ident {
        format_ident!("{}", self)
    }
}

pub trait TypeAliasize<T> {
    fn as_type_alias(&self) -> T;
}

pub trait Literally {
    fn is_literal(&self) -> bool;
}

pub trait HasMembers {
    fn get_members(&self) -> Vec<ActDataType>;
}

#[derive(Clone, Debug)]
pub enum LiteralOrTypeAlias<L, T> {
    Literal(L),
    TypeAlias(T),
}

impl<L: ToTokenStream, T: ToTokenStream> ToTokenStream for LiteralOrTypeAlias<L, T> {
    fn to_token_stream(&self) -> proc_macro2::TokenStream {
        match self {
            LiteralOrTypeAlias::Literal(literal) => literal.to_token_stream(),
            LiteralOrTypeAlias::TypeAlias(type_alias) => type_alias.to_token_stream(),
        }
    }
}

impl<L, T> Literally for LiteralOrTypeAlias<L, T> {
    fn is_literal(&self) -> bool {
        match self {
            LiteralOrTypeAlias::Literal(_) => true,
            LiteralOrTypeAlias::TypeAlias(_) => false,
        }
    }
}
