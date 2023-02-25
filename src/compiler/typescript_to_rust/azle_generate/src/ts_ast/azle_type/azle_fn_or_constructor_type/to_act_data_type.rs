use cdk_framework::act::node::{to_node::ToDataType, DataType};

use super::AzleFnOrConstructorType;

impl ToDataType for AzleFnOrConstructorType<'_> {
    fn to_data_type(&self) -> DataType {
        match self {
            AzleFnOrConstructorType::AzleFnType(azle_fn_type) => azle_fn_type.to_data_type(),
        }
    }
}
