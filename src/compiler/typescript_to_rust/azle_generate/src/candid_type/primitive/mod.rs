pub mod errors;

use cdk_framework::act::node::candid::Primitive;
use swc_common::Span;
use swc_ecma_ast::{TsKeywordType, TsKeywordTypeKind};

use crate::{traits::GetSpan, ts_ast::SourceMapped, Error};

impl SourceMapped<'_, TsKeywordType> {
    pub fn to_primitive(&self) -> Result<Primitive, Vec<Error>> {
        Ok(match self.kind {
            TsKeywordTypeKind::TsBooleanKeyword => Primitive::Bool,
            TsKeywordTypeKind::TsStringKeyword => Primitive::String,
            TsKeywordTypeKind::TsVoidKeyword => Primitive::Void,
            TsKeywordTypeKind::TsNullKeyword => Primitive::Null,
            TsKeywordTypeKind::TsNumberKeyword => Primitive::Float64,
            _ => return Err(vec![Error::UnsupportedTypeError]),
        })
    }
}

impl GetSpan for TsKeywordType {
    fn get_span(&self) -> Span {
        self.span
    }
}
