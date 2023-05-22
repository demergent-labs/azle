use swc_ecma_ast::TsType;

use crate::ts_ast::SourceMapped;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct UnexpectedTsType {}

impl UnexpectedTsType {
    pub fn from_ts_type(sm_ts_type: &SourceMapped<TsType>) -> Self {
        // "Unexpected TsType\n     at {}:{}:{}\n\nHelp: Try removing this type",
        Self {}
    }
}

impl From<UnexpectedTsType> for crate::Error {
    fn from(error: UnexpectedTsType) -> Self {
        Self::UnexpectedTsType(error)
    }
}
