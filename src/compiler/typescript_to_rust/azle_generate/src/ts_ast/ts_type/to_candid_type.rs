use std::ops::Deref;
use swc_ecma_ast::{TsFnOrConstructorType, TsType};

use cdk_framework::act::node::CandidType;

use crate::{traits::GetSourceInfo, ts_ast::SourceMapped};

impl SourceMapped<'_, TsType> {
    pub fn to_candid_type(&self) -> CandidType {
        match self.deref() {
            TsType::TsKeywordType(x) => SourceMapped::new(x, self.source_map).to_candid_type(),
            TsType::TsFnOrConstructorType(TsFnOrConstructorType::TsFnType(x)) => {
                SourceMapped::new(x, self.source_map).to_candid_type()
            }
            TsType::TsTypeRef(x) => SourceMapped::new(x, self.source_map).to_candid_type(),
            TsType::TsTypeLit(_) => {
                let origin = self.get_origin();
                let line_number = self.get_line_number();
                let range = self.get_range();
                let column_number = range.0 + 1;

                panic!("Unexpected TsTypeLiteral\n     at {}:{}:{}\n\nHelp: Try wrapping this with either Record or Variant", origin, line_number, column_number)
            }
            TsType::TsTupleType(_) => {
                let origin = self.get_origin();
                let line_number = self.get_line_number();
                let range = self.get_range();
                let column_number = range.0 + 1;

                panic!("Unexpected TsTupleType\n     at {}:{}:{}\n\nHelp: Try wrapping this with Tuple", origin, line_number, column_number)
            }
            _ => {
                let origin = self.get_origin();
                let line_number = self.get_line_number();
                let range = self.get_range();
                let column_number = range.0 + 1;

                panic!(
                    "Unexpected TsType\n     at {}:{}:{}\n\nHelp: Try removing this type",
                    origin, line_number, column_number
                )
            }
        }
    }
}
