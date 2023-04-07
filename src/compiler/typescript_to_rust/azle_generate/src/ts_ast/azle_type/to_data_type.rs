use cdk_framework::act::node::CandidType;

use super::AzleType;
use crate::ts_ast::traits::GetSourceInfo;

impl AzleType<'_> {
    pub fn to_data_type(&self) -> CandidType {
        match self {
            AzleType::AzleKeywordType(azle_keyword_type) => azle_keyword_type.to_data_type(),
            AzleType::AzleTypeRef(azle_type_ref) => azle_type_ref.to_candid_type(),
            AzleType::AzleTypeLit(_) => {
                let origin = self.get_origin();
                let line_number = self.get_line_number();
                let range = self.get_range();
                let column_number = range.0 + 1;

                panic!("Unexpected TsTypeLiteral\n     at {}:{}:{}\n\nHelp: Try wrapping this with either Record or Variant", origin, line_number, column_number)
            }
            AzleType::AzleTupleType(_) => {
                let origin = self.get_origin();
                let line_number = self.get_line_number();
                let range = self.get_range();
                let column_number = range.0 + 1;

                panic!("Unexpected TsTupleType\n     at {}:{}:{}\n\nHelp: Try wrapping this with Tuple", origin, line_number, column_number)
            }
            AzleType::AzleFnOrConstructorType(azle_fn_or_constructor_type) => {
                match azle_fn_or_constructor_type {
                    super::AzleFnOrConstructorType::AzleFnType(azle_fn_type) => {
                        azle_fn_type.to_data_type()
                    }
                }
            }
        }
    }
}
