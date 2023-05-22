use swc_ecma_ast::TsFnType;

use crate::ts_ast::SourceMapped;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct NotEnclosedInFunc {}

impl NotEnclosedInFunc {
    pub fn from_ts_fn_type(sm_ts_fn_type: &SourceMapped<TsFnType>) -> Self {
        Self {}
    }
}

impl From<NotEnclosedInFunc> for crate::Error {
    fn from(error: NotEnclosedInFunc) -> Self {
        Self::NotEnclosedInFunc(error)
    }
}
