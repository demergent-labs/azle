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
        Ok(Some(match self.get_name()? {
            "blob" => Primitive::Blob,
            "float32" => Primitive::Float32,
            "float64" => Primitive::Float64,
            "int" => Primitive::Int,
            "int8" => Primitive::Int8,
            "int16" => Primitive::Int16,
            "int32" => Primitive::Int32,
            "int64" => Primitive::Int64,
            "nat" => Primitive::Nat,
            "nat8" => Primitive::Nat8,
            "nat16" => Primitive::Nat16,
            "nat32" => Primitive::Nat32,
            "nat64" => Primitive::Nat64,
            "Principal" => Primitive::Principal,
            "empty" => Primitive::Empty,
            "reserved" => Primitive::Reserved,
            "text" => Primitive::String,
            _ => return Ok(None),
        }))
    }
}

impl GetSpan for TsKeywordType {
    fn get_span(&self) -> Span {
        self.span
    }
}
