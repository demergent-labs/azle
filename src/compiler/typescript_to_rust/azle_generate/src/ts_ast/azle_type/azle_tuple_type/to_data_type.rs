use cdk_framework::act::node::{data_type::Tuple, DataType};

use super::AzleTupleType;

impl AzleTupleType<'_> {
    pub fn to_data_type(&self) -> DataType {
        DataType::Tuple(Tuple {
            name: None,
            members: self.get_elem_types(),
        })
    }
}
