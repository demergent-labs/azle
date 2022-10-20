use super::AzleFnOrConstructorType;
use crate::cdk_act::ToActDataType;

impl ToActDataType for AzleFnOrConstructorType<'_> {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> crate::cdk_act::ActDataType {
        match self {
            AzleFnOrConstructorType::AzleFnType(azle_fn_type) => {
                azle_fn_type.to_act_data_type(alias_name)
            }
        }
    }
}
