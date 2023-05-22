use swc_ecma_ast::TsTypeRef;

use crate::ts_ast::SourceMapped;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct WrongNumberOfParams {}

impl WrongNumberOfParams {
    pub fn from_ts_type_ref(sm_ts_type_ref: &SourceMapped<TsTypeRef>) -> Self {
        Self {}
    }
}

impl From<WrongNumberOfParams> for crate::Error {
    fn from(error: WrongNumberOfParams) -> Self {
        Self::WrongNumberOfParams(error)
    }
}
