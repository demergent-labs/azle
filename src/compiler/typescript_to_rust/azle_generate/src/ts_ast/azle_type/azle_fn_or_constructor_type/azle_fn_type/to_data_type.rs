use cdk_framework::act::node::DataType;

use super::AzleFnType;

impl AzleFnType<'_> {
    pub fn to_data_type(&self) -> DataType {
        panic!("{}", self.not_enclosed_in_func_error());
    }
}
