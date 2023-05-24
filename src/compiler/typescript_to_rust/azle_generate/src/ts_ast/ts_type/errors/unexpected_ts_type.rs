use swc_ecma_ast::TsType;

use crate::{errors::Location, traits::GetSourceInfo, ts_ast::SourceMapped};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct UnexpectedTsType {
    location: Location,
}

impl UnexpectedTsType {
    pub fn from_ts_type(sm_ts_type: &SourceMapped<TsType>) -> Self {
        Self {
            location: sm_ts_type.get_location(),
        }
    }
}

impl std::error::Error for UnexpectedTsType {}

impl From<UnexpectedTsType> for crate::Error {
    fn from(error: UnexpectedTsType) -> Self {
        Self::UnexpectedTsType(error)
    }
}

impl std::fmt::Display for UnexpectedTsType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let column_number = self.location.range.0 + 1;
        write!(
            f,
            "Unexpected TsType\n     at {}:{}:{}\n\nHelp: Try removing this type",
            self.location.origin, self.location.line_number, column_number
        )
    }
}
