use swc_ecma_ast::NewExpr;

use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct MissingArgs {
    source: String,
    location: Location,
}

impl MissingArgs {
    pub fn from_new_expr(sm_new_expr: &SourceMapped<NewExpr>) -> Self {
        Self {
            source: sm_new_expr.get_source(),
            location: sm_new_expr.get_location(),
        }
    }

    fn build_missing_args_error_message(&self) -> CompilerOutput {
        super::build_arg_error_message("missing arguments", &self.source, &self.location)
    }
}

impl std::error::Error for MissingArgs {}

impl From<MissingArgs> for crate::Error {
    fn from(error: MissingArgs) -> Self {
        Self::MissingArgs(error)
    }
}

impl std::fmt::Display for MissingArgs {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.build_missing_args_error_message())
    }
}
