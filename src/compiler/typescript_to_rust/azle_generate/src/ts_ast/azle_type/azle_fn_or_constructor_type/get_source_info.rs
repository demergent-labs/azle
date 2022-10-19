use super::AzleFnOrConstructorType;
use crate::ts_ast::ast_traits::GetSourceInfo;

impl GetSourceInfo for AzleFnOrConstructorType<'_> {
    fn get_source(&self) -> String {
        match self {
            AzleFnOrConstructorType::AzleFnType(azle_fn_type) => azle_fn_type.get_source(),
        }
    }

    fn get_line_number(&self) -> usize {
        match self {
            AzleFnOrConstructorType::AzleFnType(azle_fn_type) => azle_fn_type.get_line_number(),
        }
    }

    fn get_origin(&self) -> String {
        match self {
            AzleFnOrConstructorType::AzleFnType(azle_fn_type) => azle_fn_type.get_origin(),
        }
    }

    fn get_range(&self) -> (usize, usize) {
        match self {
            AzleFnOrConstructorType::AzleFnType(azle_fn_type) => azle_fn_type.get_range(),
        }
    }
}
