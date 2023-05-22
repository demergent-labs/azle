use swc_ecma_ast::TsType;

use crate::ts_ast::SourceMapped;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct UnexpectedTsTupleTypes {}

impl UnexpectedTsTupleTypes {
    pub fn from_ts_type(sm_ts_type: &SourceMapped<TsType>) -> Self {
        // "Unexpected TsTupleType\n     at {}:{}:{}\n\nHelp: Try wrapping this with Tuple", origin, line_number, column_number
        Self {}
    }
}

impl From<UnexpectedTsTupleTypes> for crate::Error {
    fn from(error: UnexpectedTsTupleTypes) -> Self {
        Self::UnexpectedTsTupleType(error)
    }
}

impl std::fmt::Display for UnexpectedTsTupleTypes {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "TODO")
    }
}
