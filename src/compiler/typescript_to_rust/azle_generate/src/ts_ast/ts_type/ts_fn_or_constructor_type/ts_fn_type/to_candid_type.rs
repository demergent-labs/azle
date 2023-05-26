use swc_ecma_ast::TsFnType;

use crate::{ts_ast::SourceMapped, Error};

use super::errors::NotEnclosedInFunc;

impl SourceMapped<'_, TsFnType> {
    pub fn to_func(&self) -> Error {
        NotEnclosedInFunc::from_ts_fn_type(self).into()
    }
}
