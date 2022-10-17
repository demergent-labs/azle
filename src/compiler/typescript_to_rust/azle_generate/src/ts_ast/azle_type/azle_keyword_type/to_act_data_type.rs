use super::AzleKeywordType;
use crate::cdk_act::ToActDataType;

impl ToActDataType for AzleKeywordType<'_> {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> crate::cdk_act::ActDataType {
        self.ts_keyword_type.to_act_data_type(alias_name)
    }
}
