use swc_ecma_ast::TsType;

use crate::{errors::Location, traits::GetSourceInfo, ts_ast::SourceMapped};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct UnexpectedTsTupleTypes {
    location: Location,
}

impl UnexpectedTsTupleTypes {
    pub fn from_ts_type(sm_ts_type: &SourceMapped<TsType>) -> Self {
        Self {
            location: sm_ts_type.get_location(),
        }
    }
}

impl std::error::Error for UnexpectedTsTupleTypes {}

impl From<UnexpectedTsTupleTypes> for crate::Error {
    fn from(error: UnexpectedTsTupleTypes) -> Self {
        Self::UnexpectedTsTupleType(error)
    }
}

impl std::fmt::Display for UnexpectedTsTupleTypes {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let column_number = self.location.range.0 + 1;
        write!(
            f,
            "Unexpected TsTupleType\n     at {}:{}:{}\n\nHelp: Try wrapping this with Tuple",
            self.location.origin, self.location.line_number, column_number
        )
    }
}
