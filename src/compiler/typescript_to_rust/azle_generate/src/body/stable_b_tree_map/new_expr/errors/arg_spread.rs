use swc_ecma_ast::NewExpr;

use crate::{errors::CompilerOutput, traits::GetSourceInfo, ts_ast::SourceMapped};

#[derive(Debug, Clone, PartialEq)]
pub struct ArgSpread {
    compiler_output: CompilerOutput,
}

impl ArgSpread {
    pub fn from_new_expr(sm_new_expr: &SourceMapped<NewExpr>) -> Self {
        Self {
            compiler_output: sm_new_expr.build_arg_spread_error_message(),
        }
    }
}

impl std::error::Error for ArgSpread {}

impl From<ArgSpread> for crate::Error {
    fn from(error: ArgSpread) -> Self {
        Self::ArgSpread(error)
    }
}

impl std::fmt::Display for ArgSpread {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.compiler_output)
    }
}

impl SourceMapped<'_, NewExpr> {
    fn build_arg_spread_error_message(&self) -> CompilerOutput {
        let title = "StableBTreeMap does not currently support argument spreading".to_string();
        let source = self.get_source();
        // UNWRAP HERE // UNWRAP HERE
        let range = (source.find("(").unwrap() + 1, source.find(")").unwrap());
        let annotation = "attempted to spread arguments here".to_string();
        let help = "specify each argument individually. E.g.:".to_string();
        let suggestion = "memory_id, max_key_size, max_value_size".to_string();

        self.build_error_message(title, range, annotation, help, suggestion)
    }
}
