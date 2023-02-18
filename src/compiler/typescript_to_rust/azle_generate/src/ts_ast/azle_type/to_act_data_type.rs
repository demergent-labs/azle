use crate::ts_ast::ast_traits::GetSourceInfo;

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
            AzleType::AzleTypeLit(_) => {
                let origin = self.get_origin();
                let line_number = self.get_line_number();
                let range = self.get_range();
                let column_number = range.0 + 1;

                panic!("Unexpected TsTypeLiteral\n     at {}:{}:{}\n\nHelp: Try wrapping this with either Record or Variant", origin, line_number, column_number)
            }
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
