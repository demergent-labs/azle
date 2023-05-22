use swc_ecma_ast::TsType;

use crate::ts_ast::SourceMapped;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct UnexpectedTsTypeLiteral {}

impl UnexpectedTsTypeLiteral {
    pub fn from_ts_type(sm_ts_type: &SourceMapped<TsType>) -> Self {
        // "Unexpected TsTypeLiteral\n     at {}:{}:{}\n\nHelp: Try wrapping this with either Record or Variant", origin, line_number, column_number
        Self {}
    }
}

impl From<UnexpectedTsTypeLiteral> for crate::Error {
    fn from(error: UnexpectedTsTypeLiteral) -> Self {
        Self::UnexpectedTsTypeLiteral(error)
    }
}
