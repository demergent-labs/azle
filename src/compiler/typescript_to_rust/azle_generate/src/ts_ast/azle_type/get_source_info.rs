use super::AzleType;
use crate::ts_ast::ast_traits::GetSourceInfo;

impl GetSourceInfo for AzleType<'_> {
    fn get_source(&self) -> String {
        match self {
            AzleType::AzleKeywordType(azle_keyword_type) => azle_keyword_type.get_source(),
            AzleType::AzleTypeRef(azle_type_ref) => azle_type_ref.get_source(),
            AzleType::AzleTypeLit(azle_type_lit) => azle_type_lit.get_source(),
            AzleType::AzleArrayType(azle_array_type) => azle_array_type.get_source(),
            AzleType::AzleFnOrConstructorType(azle_fn_or_constructor_type) => {
                azle_fn_or_constructor_type.get_source()
            }
            AzleType::AzleTupleType(azle_tuple_type) => azle_tuple_type.get_source(),
        }
    }

    fn get_line_number(&self) -> usize {
        match self {
            AzleType::AzleKeywordType(azle_keyword_type) => azle_keyword_type.get_line_number(),
            AzleType::AzleTypeRef(azle_type_ref) => azle_type_ref.get_line_number(),
            AzleType::AzleTypeLit(azle_type_lit) => azle_type_lit.get_line_number(),
            AzleType::AzleArrayType(azle_array_type) => azle_array_type.get_line_number(),
            AzleType::AzleFnOrConstructorType(azle_fn_or_constructor_type) => {
                azle_fn_or_constructor_type.get_line_number()
            }
            AzleType::AzleTupleType(azle_tuple_type) => azle_tuple_type.get_line_number(),
        }
    }

    fn get_origin(&self) -> String {
        match self {
            AzleType::AzleKeywordType(azle_keyword_type) => azle_keyword_type.get_origin(),
            AzleType::AzleTypeRef(azle_type_ref) => azle_type_ref.get_origin(),
            AzleType::AzleTypeLit(azle_type_lit) => azle_type_lit.get_origin(),
            AzleType::AzleArrayType(azle_array_type) => azle_array_type.get_origin(),
            AzleType::AzleFnOrConstructorType(azle_fn_or_constructor_type) => {
                azle_fn_or_constructor_type.get_origin()
            }
            AzleType::AzleTupleType(azle_tuple_type) => azle_tuple_type.get_origin(),
        }
    }

    fn get_range(&self) -> (usize, usize) {
        match self {
            AzleType::AzleKeywordType(azle_keyword_type) => azle_keyword_type.get_range(),
            AzleType::AzleTypeRef(azle_type_ref) => azle_type_ref.get_range(),
            AzleType::AzleTypeLit(azle_type_lit) => azle_type_lit.get_range(),
            AzleType::AzleArrayType(azle_array_type) => azle_array_type.get_range(),
            AzleType::AzleFnOrConstructorType(azle_fn_or_constructor_type) => {
                azle_fn_or_constructor_type.get_range()
            }
            AzleType::AzleTupleType(azle_tuple_type) => azle_tuple_type.get_range(),
        }
    }
}
