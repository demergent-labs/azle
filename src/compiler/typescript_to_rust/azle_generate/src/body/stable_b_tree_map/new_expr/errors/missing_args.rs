use swc_ecma_ast::NewExpr;

use crate::{errors::CompilerOutput, ts_ast::SourceMapped};

#[derive(Debug, Clone, PartialEq)]
pub struct MissingArgs {
    compiler_output: CompilerOutput,
}

impl MissingArgs {
    pub fn from_new_expr(sm_new_expr: &SourceMapped<NewExpr>) -> Self {
        Self {
            compiler_output: sm_new_expr.build_missing_args_error_message(),
        }
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
        write!(f, "{}", self.compiler_output)
    }
}

impl SourceMapped<'_, NewExpr> {
    pub fn build_missing_args_error_message(&self) -> CompilerOutput {
        self.build_arg_error_message("missing arguments".to_string())
    }
}
