use cdk_framework::act::node::{candid::Primitive, CandidType};
use swc_ecma_ast::{TsKeywordType, TsKeywordTypeKind};

use crate::ts_ast::SourceMapped;

impl SourceMapped<'_, TsKeywordType> {
    pub fn to_candid_type(&self) -> CandidType {
        match self.kind {
            TsKeywordTypeKind::TsBooleanKeyword => CandidType::Primitive(Primitive::Bool),
            TsKeywordTypeKind::TsStringKeyword => CandidType::Primitive(Primitive::String),
            TsKeywordTypeKind::TsVoidKeyword => CandidType::Primitive(Primitive::Void),
            TsKeywordTypeKind::TsNullKeyword => CandidType::Primitive(Primitive::Null),
            TsKeywordTypeKind::TsNumberKeyword => CandidType::Primitive(Primitive::Float64),
            _ => panic!("{}", self.unsupported_type_error()),
        }
    }
}
