use swc_ecma_ast::TsKeywordTypeKind;

use super::AzleKeywordType;
use cdk_framework::act::node::{candid::Primitive, CandidType};

impl AzleKeywordType<'_> {
    pub fn to_data_type(&self) -> CandidType {
        match self.ts_keyword_type.kind {
            TsKeywordTypeKind::TsBooleanKeyword => CandidType::Primitive(Primitive::Bool),
            TsKeywordTypeKind::TsStringKeyword => CandidType::Primitive(Primitive::String),
            TsKeywordTypeKind::TsVoidKeyword => CandidType::Primitive(Primitive::Void),
            TsKeywordTypeKind::TsNullKeyword => CandidType::Primitive(Primitive::Null),
            _ => panic!("{}", self.unsupported_type_error()),
        }
    }
}
