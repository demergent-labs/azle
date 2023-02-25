use cdk_framework::act::node::{to_node::ToDataType, DataType};

use super::AzleFnType;

impl ToDataType for AzleFnType<'_> {
    fn to_data_type(&self) -> DataType {
        panic!("{}", self.not_enclosed_in_func_error());
    }
}
