use std::ops::Deref;
use swc_ecma_ast::{TsTupleType, TsType, TsTypeLit};

use crate::ts_ast::SourceMapped;

pub mod errors;
mod get_span;
mod to_candid_type;
pub mod ts_fn_or_constructor_type;
mod type_to_string;

impl<'a> SourceMapped<'a, TsType> {
    pub fn as_ts_type_lit(&'a self) -> Option<SourceMapped<'a, TsTypeLit>> {
        match self.deref() {
            TsType::TsTypeLit(type_lit) => Some(self.spawn(type_lit)),
            _ => None,
        }
    }

    pub fn as_ts_tuple_type(&'a self) -> Option<SourceMapped<'a, TsTupleType>> {
        match self.deref() {
            TsType::TsTupleType(tuple_type) => Some(self.spawn(tuple_type)),
            _ => None,
        }
    }
}
