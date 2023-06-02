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
            TsType::TsTypeLit(type_lit) => Some(SourceMapped::new_from_parent(type_lit, self)),
            _ => None,
        }
    }

    pub fn as_ts_tuple_type(&'a self) -> Option<SourceMapped<'a, TsTupleType>> {
        match self.deref() {
            TsType::TsTupleType(tuple_type) => {
                Some(SourceMapped::new_from_parent(tuple_type, self))
            }
            _ => None,
        }
    }
}
