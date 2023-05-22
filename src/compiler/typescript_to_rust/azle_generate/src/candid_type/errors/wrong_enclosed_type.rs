use swc_ecma_ast::TsTypeRef;

use crate::ts_ast::SourceMapped;

#[derive(Debug, Clone, Eq, PartialEq)]
pub struct WrongEnclosedType {}

impl WrongEnclosedType {
    pub fn from_ts_type_ref(_: &SourceMapped<TsTypeRef>) -> Self {
        WrongEnclosedType {}
    }
}

impl std::error::Error for WrongEnclosedType {}

impl std::fmt::Display for WrongEnclosedType {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl From<WrongEnclosedType> for crate::Error {
    fn from(value: WrongEnclosedType) -> Self {
        Self::WrongEnclosedType(value)
    }
}
