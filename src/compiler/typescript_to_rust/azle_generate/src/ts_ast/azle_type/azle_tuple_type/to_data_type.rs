use cdk_framework::act::node::{candid::Tuple, CandidType};

use super::AzleTupleType;

impl AzleTupleType<'_> {
    pub fn to_data_type(&self) -> CandidType {
        CandidType::Tuple(Tuple {
            name: None,
            elems: self.get_elem_types(),
        })
    }
}
