use cdk_framework::act::node::{candid::Array, CandidType};

use crate::ts_ast::AzleArrayType;

impl AzleArrayType<'_> {
    pub fn to_data_type(&self) -> CandidType {
        let elem_type = self.get_elem_type().to_data_type();
        CandidType::Array(Array {
            enclosed_type: Box::from(elem_type),
        })
    }
}
