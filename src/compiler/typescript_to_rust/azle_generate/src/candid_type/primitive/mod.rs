pub mod errors;

use cdk_framework::act::node::candid::Primitive;
use swc_common::Span;
use swc_ecma_ast::{TsKeywordType, TsKeywordTypeKind, TsTypeRef};

use crate::{
    traits::{GetNameWithError, GetSpan},
    ts_ast::SourceMapped,
    Error,
};

use self::errors::UnsupportedType;

impl SourceMapped<'_, TsKeywordType> {
    pub fn to_primitive(&self) -> Result<Primitive, Error> {
        Ok(match self.kind {
            TsKeywordTypeKind::TsBooleanKeyword => Primitive::Bool,
            TsKeywordTypeKind::TsStringKeyword => Primitive::String,
            TsKeywordTypeKind::TsVoidKeyword => Primitive::Void,
            TsKeywordTypeKind::TsNullKeyword => Primitive::Null,
            TsKeywordTypeKind::TsNumberKeyword => Primitive::Float64,
            _ => return Err(UnsupportedType::error_from_ts_keyword_type(self).into()),
        })
    }
}

impl SourceMapped<'_, TsTypeRef> {
    pub fn to_primitive(&self) -> Result<Option<Primitive>, Error> {
        let name = self.get_name()?.to_string();
        Ok(Some(match name.as_str() {
            _ if self.symbol_table.blob.contains(&name) => Primitive::Blob,
            _ if self.symbol_table.float32.contains(&name) => Primitive::Float32,
            _ if self.symbol_table.float64.contains(&name) => Primitive::Float64,
            _ if self.symbol_table.int.contains(&name) => Primitive::Int,
            _ if self.symbol_table.int8.contains(&name) => Primitive::Int8,
            _ if self.symbol_table.int16.contains(&name) => Primitive::Int16,
            _ if self.symbol_table.int32.contains(&name) => Primitive::Int32,
            _ if self.symbol_table.int64.contains(&name) => Primitive::Int64,
            _ if self.symbol_table.nat.contains(&name) => Primitive::Nat,
            _ if self.symbol_table.nat8.contains(&name) => Primitive::Nat8,
            _ if self.symbol_table.nat16.contains(&name) => Primitive::Nat16,
            _ if self.symbol_table.nat32.contains(&name) => Primitive::Nat32,
            _ if self.symbol_table.nat64.contains(&name) => Primitive::Nat64,
            _ if self.symbol_table.principal.contains(&name) => Primitive::Principal,
            _ if self.symbol_table.empty.contains(&name) => Primitive::Empty,
            _ if self.symbol_table.reserved.contains(&name) => Primitive::Reserved,
            _ if self.symbol_table.text.contains(&name) => Primitive::String,
            _ if self.symbol_table.null.contains(&name) => Primitive::Null,
            _ if self.symbol_table.void.contains(&name) => Primitive::Void,
            _ if self.symbol_table.bool.contains(&name) => Primitive::Bool,
            _ => return Ok(None),
        }))
    }
}

impl GetSpan for TsKeywordType {
    fn get_span(&self) -> Span {
        self.span
    }
}
