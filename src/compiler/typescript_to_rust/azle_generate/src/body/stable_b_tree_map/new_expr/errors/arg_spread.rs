use swc_ecma_ast::NewExpr;

use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct ArgSpread {
    source: String,
    location: Location,
}

impl ArgSpread {
    pub fn from_new_expr(sm_new_expr: &SourceMapped<NewExpr>) -> Self {
        Self {
            source: sm_new_expr.get_source(),
            location: sm_new_expr.get_location(),
        }
    }

    fn build_arg_spread_error_message(&self) -> CompilerOutput {
        let title = "StableBTreeMap does not currently support argument spreading".to_string();
        // UNWRAP HERE // UNWRAP HERE
        let range = (
            self.source.find("(").unwrap() + 1,
            self.source.find(")").unwrap(),
        );
        let annotation = "attempted to spread arguments here".to_string();
        let help = "specify each argument individually. E.g.:".to_string();
        let suggestion = "memory_id, max_key_size, max_value_size".to_string();

        super::build_error_message(
            &title,
            &self.source,
            &self.location,
            range,
            annotation,
            help,
            suggestion,
        )
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
        write!(f, "{}", self.build_arg_spread_error_message())
    }
}

impl SourceMapped<'_, NewExpr> {}
