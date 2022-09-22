pub use act_data_type_node::{
    build_inline_types_from_type_alias_acts, deduplicate, ActAliasedType, ActDataTypeNode,
};
pub use arrays::{ActArray, ActArrayLiteral, ActArrayTypeAlias};
pub use funcs::ActFunc;
pub use option::ActOption;
pub use primitives::{ActPrimitive, ActPrimitiveLit, ActPrimitiveTypeAlias};
use proc_macro2::{Ident, TokenStream};
use quote::format_ident;
pub use record::{ActRecord, ActRecordMember};
pub use tuple::{ActTuple, ActTupleElem};
pub use type_ref::{ActTypeRef, ActTypeRefLit, ActTypeRefTypeAlias};
pub use variants::{ActVariant, ActVariantMember};

pub mod act_data_type_node;
pub mod arrays;
pub mod funcs;
pub mod option;
pub mod primitives;
pub mod record;
pub mod tuple;
pub mod type_ref;
pub mod variants;

pub trait ToTokenStream {
    fn to_token_stream(&self) -> TokenStream;
}

pub trait ToIdent {
    fn to_ident(&self) -> Ident;
}

impl ToIdent for String {
    fn to_ident(&self) -> Ident {
        format_ident!("{}", self)
    }
}
