use swc_ecma_ast::TsType;

use crate::{errors::Location, traits::GetSourceInfo, ts_ast::SourceMapped};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct UnexpectedTsTypeLiteral {
    location: Location,
}

impl UnexpectedTsTypeLiteral {
    pub fn from_ts_type(sm_ts_type: &SourceMapped<TsType>) -> Self {
        Self {
            location: sm_ts_type.get_location(),
        }
    }
}

impl std::error::Error for UnexpectedTsTypeLiteral {}

impl From<UnexpectedTsTypeLiteral> for crate::Error {
    fn from(error: UnexpectedTsTypeLiteral) -> Self {
        Self::UnexpectedTsTypeLiteral(error)
    }
}

impl std::fmt::Display for UnexpectedTsTypeLiteral {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let column_number = self.location.range.0 + 1;
        write!(
            f,
            "Unexpected TsTypeLiteral\n     at {}:{}:{}\n\nHelp: Try wrapping this with either Record or Variant",
            self.location.origin, self.location.line_number, column_number
        )
    }
}
