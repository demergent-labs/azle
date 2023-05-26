use swc_ecma_ast::{ClassProp, NewExpr};

use crate::{errors::CompilerOutput, ts_ast::SourceMapped};

#[derive(Debug, Clone, PartialEq)]
pub struct MissingTypeArguments {
    compiler_output: Option<CompilerOutput>,
    message: Option<String>,
}

impl MissingTypeArguments {
    pub fn from_class_prop(_: &ClassProp) -> Self {
        Self {
            message: Some(
                "Missing type argument. Generic type CallResult requires 1 type argument."
                    .to_string(),
            ),
            compiler_output: None,
        }
    }

    pub fn from_new_expr(sm_new_expr: &SourceMapped<NewExpr>) -> Self {
        Self {
            compiler_output: Some(sm_new_expr.build_missing_type_args_error_message()),
            message: None,
        }
    }
}

impl std::error::Error for MissingTypeArguments {}

impl From<MissingTypeArguments> for crate::Error {
    fn from(error: MissingTypeArguments) -> Self {
        Self::MissingTypeArgument(error)
    }
}

impl std::fmt::Display for MissingTypeArguments {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let message = if let Some(message) = self.message.clone() {
            message
        } else if let Some(compiler_output) = &self.compiler_output {
            compiler_output.to_string()
        } else {
            "Missing type argument".to_string()
        };
        write!(f, "{}", message)
    }
}

impl SourceMapped<'_, NewExpr> {
    pub fn build_missing_type_args_error_message(&self) -> CompilerOutput {
        self.build_type_arg_error_message("missing type arguments".to_string())
    }
}
