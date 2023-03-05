use swc_ecma_ast::TsKeywordTypeKind;

use super::AzleKeywordType;
use cdk_framework::act::node::{data_type::Primitive, DataType};

impl AzleKeywordType<'_> {
    pub fn to_data_type(&self) -> DataType {
        match self.ts_keyword_type.kind {
            TsKeywordTypeKind::TsBooleanKeyword => DataType::Primitive(Primitive::Bool),
            TsKeywordTypeKind::TsStringKeyword => DataType::Primitive(Primitive::String),
            TsKeywordTypeKind::TsVoidKeyword => DataType::Primitive(Primitive::Void),
            TsKeywordTypeKind::TsNullKeyword => DataType::Primitive(Primitive::Null),
            _ => panic!("{}", self.unsupported_type_error()),
        }
    }
}
