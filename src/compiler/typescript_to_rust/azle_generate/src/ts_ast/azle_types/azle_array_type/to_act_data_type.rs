use crate::cdk_act::ToActDataType;
use crate::ts_ast::AzleArrayType;

impl ToActDataType for AzleArrayType<'_> {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> crate::cdk_act::ActDataType {
        self.ts_array_type.to_act_data_type(alias_name)
    }
}
