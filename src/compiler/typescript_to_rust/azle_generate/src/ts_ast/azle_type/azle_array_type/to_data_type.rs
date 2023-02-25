use cdk_framework::act::node::{data_type::Array, to_node::ToDataType, DataType};

use crate::ts_ast::AzleArrayType;

impl ToDataType for AzleArrayType<'_> {
    fn to_data_type(&self) -> DataType {
        let elem_type = self.get_elem_type().to_data_type();
        DataType::Array(Array {
            enclosed_type: Box::from(elem_type),
        })
    }
}
