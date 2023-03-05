use cdk_framework::act::node::{data_type::Array, DataType};

use crate::ts_ast::AzleArrayType;

impl AzleArrayType<'_> {
    pub fn to_data_type(&self) -> DataType {
        let elem_type = self.get_elem_type().to_data_type();
        DataType::Array(Array {
            enclosed_type: Box::from(elem_type),
        })
    }
}
