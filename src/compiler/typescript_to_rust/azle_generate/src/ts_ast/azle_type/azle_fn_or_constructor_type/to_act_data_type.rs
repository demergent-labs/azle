use super::AzleFnOrConstructorType;
use cdk_framework::ToActDataType;

impl ToActDataType for AzleFnOrConstructorType<'_> {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> cdk_framework::ActDataType {
        match self {
            AzleFnOrConstructorType::AzleFnType(azle_fn_type) => {
                azle_fn_type.to_act_data_type(alias_name)
            }
        }
    }
}
