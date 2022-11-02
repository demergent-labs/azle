use super::AzleFnType;
use cdk_framework::ToActDataType;

impl ToActDataType for AzleFnType<'_> {
    fn to_act_data_type(&self, _: &Option<&String>) -> cdk_framework::ActDataType {
        panic!("{}", self.not_enclosed_in_func_error());
    }
}
