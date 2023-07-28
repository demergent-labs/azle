pub mod errors;

use cdk_framework::act::node::candid::Primitive;
use swc_common::Span;
use swc_ecma_ast::{TsKeywordType, TsKeywordTypeKind, TsTypeRef};

use crate::{
    traits::{GetName, GetSpan},
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
            TsKeywordTypeKind::TsBigIntKeyword => Primitive::Int,
            _ => return Err(UnsupportedType::error_from_ts_keyword_type(self).into()),
        })
    }
}

impl SourceMapped<'_, TsTypeRef> {
    pub fn to_primitive(&self) -> Result<Option<Primitive>, Error> {
        let name = self.get_name();
        Ok(Some(match name.as_str() {
            _ if self.alias_table.blob.contains(&name) => Primitive::Blob,
            _ if self.alias_table.float32.contains(&name) => Primitive::Float32,
            _ if self.alias_table.float64.contains(&name) => Primitive::Float64,
            _ if self.alias_table.int.contains(&name) => Primitive::Int,
            _ if self.alias_table.int8.contains(&name) => Primitive::Int8,
            _ if self.alias_table.int16.contains(&name) => Primitive::Int16,
            _ if self.alias_table.int32.contains(&name) => Primitive::Int32,
            _ if self.alias_table.int64.contains(&name) => Primitive::Int64,
            _ if self.alias_table.nat.contains(&name) => Primitive::Nat,
            _ if self.alias_table.nat8.contains(&name) => Primitive::Nat8,
            _ if self.alias_table.nat16.contains(&name) => Primitive::Nat16,
            _ if self.alias_table.nat32.contains(&name) => Primitive::Nat32,
            _ if self.alias_table.nat64.contains(&name) => Primitive::Nat64,
            _ if self.alias_table.principal.contains(&name) => Primitive::Principal,
            _ if self.alias_table.empty.contains(&name) => Primitive::Empty,
            _ if self.alias_table.reserved.contains(&name) => Primitive::Reserved,
            _ if self.alias_table.text.contains(&name) => Primitive::String,
            _ if self.alias_table.null.contains(&name) => Primitive::Null,
            _ if self.alias_table.void.contains(&name) => Primitive::Void,
            _ if self.alias_table.bool.contains(&name) => Primitive::Bool,
            _ => return Ok(None),
        }))
    }
}

impl GetSpan for TsKeywordType {
    fn get_span(&self) -> Span {
        self.span
    }
}
