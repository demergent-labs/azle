use super::AzleType;
use crate::ts_ast::GetSourceText;

impl GetSourceText for AzleType<'_> {
    fn get_source_text(&self) -> String {
        match self {
            AzleType::AzleTypeRef(type_ref) => type_ref.get_source_text(),
            AzleType::AzleKeywordType(keyword_type) => keyword_type.get_source_text(),
            AzleType::AzleTypeLit(type_lit) => type_lit.get_source_text(),
            AzleType::AzleFnOrConstructorType(fn_or_const_type) => {
                fn_or_const_type.get_source_text()
            }
            AzleType::AzleTupleType(tuple_type) => tuple_type.get_source_text(),
            AzleType::AzleArrayType(array_type) => array_type.get_source_text(),
        }
    }
}
