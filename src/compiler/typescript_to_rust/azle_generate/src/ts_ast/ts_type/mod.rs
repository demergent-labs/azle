use std::ops::Deref;

use swc_ecma_ast::{TsTupleType, TsType, TsTypeLit, TsTypeRef};

use crate::ts_ast::SourceMapped;

mod errors;
mod to_candid_type;
mod ts_fn_or_constructor_type;
mod ts_keyword_type;
mod ts_type_ref;

pub mod ts_type_lit;

impl<'a> SourceMapped<'a, TsType> {
    pub fn as_ts_type_lit(&'a self) -> Option<SourceMapped<'a, TsTypeLit>> {
        match self.deref() {
            TsType::TsTypeLit(type_lit) => Some(SourceMapped::new(type_lit, self.source_map)),
            _ => None,
        }
    }

    pub fn as_ts_tuple_type(&'a self) -> Option<SourceMapped<'a, TsTupleType>> {
        match self.deref() {
            TsType::TsTupleType(tuple_type) => Some(SourceMapped::new(tuple_type, self.source_map)),
            _ => None,
        }
    }

    pub fn as_ts_type_ref(&'a self) -> Option<SourceMapped<'a, TsTypeRef>> {
        match self.deref() {
            TsType::TsTypeRef(type_ref) => Some(SourceMapped::new(type_ref, self.source_map)),
            _ => None,
        }
    }
}
