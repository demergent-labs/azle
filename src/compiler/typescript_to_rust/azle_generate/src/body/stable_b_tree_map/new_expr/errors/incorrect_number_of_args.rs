use swc_ecma_ast::NewExpr;

use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct IncorrectNumberOfArgs {
    source: String,
    location: Location,
}

impl IncorrectNumberOfArgs {
    pub fn from_new_expr(sm_new_expr: &SourceMapped<NewExpr>) -> Self {
        Self {
            source: sm_new_expr.get_source(),
            location: sm_new_expr.get_location(),
        }
    }

    fn build_incorrect_number_of_args_error_message(&self) -> CompilerOutput {
        super::build_arg_error_message("incorrect arguments", &self.source, &self.location)
    }
}

impl std::error::Error for IncorrectNumberOfArgs {}

impl From<IncorrectNumberOfArgs> for crate::Error {
    fn from(error: IncorrectNumberOfArgs) -> Self {
        Self::IncorrectNumberOfArgs(error)
    }
}

impl std::fmt::Display for IncorrectNumberOfArgs {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.build_incorrect_number_of_args_error_message())
    }
}
