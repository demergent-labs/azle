use super::AzleType;
use cdk_framework::{ActDataType, ToActDataType};

impl ToActDataType for AzleType<'_> {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> ActDataType {
        match self {
            AzleType::AzleKeywordType(azle_keyword_type) => {
                azle_keyword_type.to_act_data_type(alias_name)
            }
            AzleType::AzleTypeRef(azle_type_ref) => azle_type_ref.to_act_data_type(alias_name),
            AzleType::AzleArrayType(azle_array_type) => {
                azle_array_type.to_act_data_type(alias_name)
            }
            AzleType::AzleTypeLit(azle_type_lit) => azle_type_lit.to_record(alias_name),
            AzleType::AzleTupleType(azle_tuple_type) => {
                azle_tuple_type.to_act_data_type(alias_name)
            }
            AzleType::AzleFnOrConstructorType(azle_fn_or_constructor_type) => {
                match azle_fn_or_constructor_type {
                    super::AzleFnOrConstructorType::AzleFnType(azle_fn_type) => {
                        azle_fn_type.to_act_data_type(alias_name)
                    }
                }
            }
        }
    }
}
