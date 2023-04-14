use cdk_framework::act::node::CandidType;

use super::AzleFnType;

impl AzleFnType<'_> {
    pub fn to_data_type(&self) -> CandidType {
        panic!("{}", self.not_enclosed_in_func_error());
    }
}
