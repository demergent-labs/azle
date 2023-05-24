use swc_ecma_ast::NewExpr;

use crate::{errors::CompilerOutput, ts_ast::SourceMapped};

#[derive(Debug, Clone, PartialEq)]
pub struct IncorrectNumberOfArgs {
    compiler_output: CompilerOutput,
}

impl IncorrectNumberOfArgs {
    pub fn from_new_expr(sm_new_expr: &SourceMapped<NewExpr>) -> Self {
        Self {
            compiler_output: sm_new_expr.build_incorrect_number_of_args_error_message(),
        }
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
        write!(f, "{}", self.compiler_output)
    }
}

impl SourceMapped<'_, NewExpr> {
    fn build_incorrect_number_of_args_error_message(&self) -> CompilerOutput {
        self.build_arg_error_message("incorrect arguments".to_string())
    }
}
