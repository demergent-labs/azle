use swc_ecma_ast::TsKeywordTypeKind;

use super::AzleKeywordType;
use cdk_framework::act::node::{data_type::Primitive, to_node::ToDataType, DataType};

impl ToDataType for AzleKeywordType<'_> {
    fn to_data_type(&self) -> DataType {
        match self.ts_keyword_type.kind {
            TsKeywordTypeKind::TsBooleanKeyword => Primitive::Bool,
            TsKeywordTypeKind::TsStringKeyword => Primitive::String,
            TsKeywordTypeKind::TsVoidKeyword => Primitive::Void,
            TsKeywordTypeKind::TsNullKeyword => Primitive::Null,
            _ => panic!("{}", self.unsupported_type_error()),
        }
        .to_data_type()
    }
}
