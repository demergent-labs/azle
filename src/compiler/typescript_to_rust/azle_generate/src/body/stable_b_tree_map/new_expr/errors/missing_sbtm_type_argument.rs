use swc_ecma_ast::NewExpr;

use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct MissingSbtmTypeArguments {
    source: String,
    location: Location,
}

impl MissingSbtmTypeArguments {
    pub fn from_new_expr(sm_new_expr: &SourceMapped<NewExpr>) -> Self {
        Self {
            source: sm_new_expr.get_source(),
            location: sm_new_expr.get_location(),
        }
    }

    pub fn build_missing_type_args_error_message(&self) -> CompilerOutput {
        super::build_type_arg_error_message("missing type arguments", &self.source, &self.location)
    }
}

impl std::error::Error for MissingSbtmTypeArguments {}

impl From<MissingSbtmTypeArguments> for crate::Error {
    fn from(error: MissingSbtmTypeArguments) -> Self {
        Self::MissingSbtmTypeArgument(error)
    }
}

impl std::fmt::Display for MissingSbtmTypeArguments {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.build_missing_type_args_error_message())
    }
}
