use super::AzleFnType;

use crate::cdk_act::ToActDataType;

impl ToActDataType for AzleFnType<'_> {
    fn to_act_data_type(&self, _: &Option<&String>) -> crate::cdk_act::ActDataType {
        panic!("{}", self.not_enclosed_in_func_error());
    }
}
