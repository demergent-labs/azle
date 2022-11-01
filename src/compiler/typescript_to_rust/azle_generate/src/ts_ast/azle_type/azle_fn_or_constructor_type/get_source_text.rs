use super::AzleFnOrConstructorType;
use crate::ts_ast::GetSourceText;

impl GetSourceText for AzleFnOrConstructorType<'_> {
    fn get_source_text(&self) -> String {
        match self {
            AzleFnOrConstructorType::AzleFnType(azle_fn_type) => azle_fn_type.get_source_text(),
        }
    }
}
