use swc_ecma_ast::TsFnType;

use crate::{ts_ast::SourceMapped, Error};

impl SourceMapped<'_, TsFnType> {
    pub fn to_func(&self) -> Error {
        panic!("{}", self.not_enclosed_in_func_error());
    }
}
