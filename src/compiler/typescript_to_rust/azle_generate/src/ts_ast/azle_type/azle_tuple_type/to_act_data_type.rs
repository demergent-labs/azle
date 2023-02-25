use cdk_framework::{
    act::node::{data_type::Tuple, DataType},
    traits::ToDataType,
};

use super::AzleTupleType;

impl ToDataType for AzleTupleType<'_> {
    fn to_data_type(&self) -> DataType {
        DataType::Tuple(Tuple {
            name: None,
            members: self.get_elem_types(),
        })
    }
}
