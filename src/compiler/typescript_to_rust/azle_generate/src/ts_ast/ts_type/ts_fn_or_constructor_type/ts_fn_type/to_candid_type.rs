use cdk_framework::act::node::CandidType;
use swc_ecma_ast::TsFnType;

use crate::ts_ast::SourceMapped;

impl SourceMapped<'_, TsFnType> {
    pub fn to_candid_type(&self) -> CandidType {
        panic!("{}", self.not_enclosed_in_func_error());
    }
}
