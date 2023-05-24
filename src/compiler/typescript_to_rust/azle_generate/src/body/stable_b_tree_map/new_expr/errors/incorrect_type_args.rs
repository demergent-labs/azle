use swc_ecma_ast::NewExpr;

use crate::{errors::CompilerOutput, ts_ast::SourceMapped};

#[derive(Debug, Clone, PartialEq)]
pub struct IncorrectTypeArgs {
    compiler_output: CompilerOutput,
}

impl IncorrectTypeArgs {
    pub fn from_new_expr(sm_new_expr: &SourceMapped<NewExpr>) -> Self {
        Self {
            compiler_output: sm_new_expr.build_incorrect_type_args_error_message(),
        }
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
        write!(f, "{}", self.compiler_output)
    }
}

impl SourceMapped<'_, NewExpr> {
    fn build_incorrect_type_args_error_message(&self) -> CompilerOutput {
        self.build_type_arg_error_message("wrong number of type arguments".to_string())
    }
}
