pub use act_arrays::{ActArray, ActArrayLiteral, ActArrayTypeAlias};
pub use act_data_type_node::{
    build_inline_types_from_type_alias_acts, deduplicate, ActDataTypeNode,
};
pub use act_funcs::{generate_func_arg_token, ActFunc};
pub use act_option::{ActOption, ActOptionLiteral, ActOptionTypeAlias};
pub use act_primitives::{ActPrimitive, ActPrimitiveLit, ActPrimitiveTypeAlias};
pub use act_record::{ActRecord, ActRecordMember};
pub use act_tuple::{ActTuple, ActTupleElem};
pub use act_type_ref::{ActTypeRef, ActTypeRefLit, ActTypeRefTypeAlias};
pub use act_variants::{ActVariant, ActVariantMember};
use proc_macro2::{Ident, TokenStream};
use quote::format_ident;

pub mod act_arrays;
pub mod act_data_type_node;
pub mod act_funcs;
pub mod act_option;
pub mod act_primitives;
pub mod act_record;
pub mod act_tuple;
pub mod act_type_ref;
pub mod act_variants;

pub trait ToTokenStream {
    fn to_token_stream(&self) -> TokenStream;
}

pub trait ToIdent {
    fn to_identifier(&self) -> Ident;
}

impl ToIdent for String {
    fn to_identifier(&self) -> Ident {
        format_ident!("{}", self)
    }
}
