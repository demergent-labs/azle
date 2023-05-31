use swc_ecma_ast::NewExpr;

use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct IncorrectTypeArgs {
    source: String,
    location: Location,
}

impl IncorrectTypeArgs {
    pub fn from_new_expr(sm_new_expr: &SourceMapped<NewExpr>) -> Self {
        Self {
            source: sm_new_expr.get_source(),
            location: sm_new_expr.get_location(),
        }
    }

    fn build_incorrect_type_args_error_message(&self) -> CompilerOutput {
        super::build_type_arg_error_message(
            "wrong number of type arguments",
            &self.source,
            &self.location,
        )
    }
}

impl std::error::Error for IncorrectTypeArgs {}

impl From<IncorrectTypeArgs> for crate::Error {
    fn from(error: IncorrectTypeArgs) -> Self {
        Self::IncorrectTypeArgs(error)
    }
}

impl std::fmt::Display for IncorrectTypeArgs {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.build_incorrect_type_args_error_message())
    }
}
