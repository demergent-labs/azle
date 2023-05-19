use std::ops::Deref;
use swc_ecma_ast::{TsFnOrConstructorType, TsType};

use cdk_framework::act::node::CandidType;

use crate::{traits::GetSourceInfo, ts_ast::SourceMapped, Error};

impl SourceMapped<'_, TsType> {
    pub fn to_candid_type(&self) -> Result<CandidType, Vec<Error>> {
        match self.deref() {
            TsType::TsKeywordType(x) => Ok(CandidType::Primitive(
                SourceMapped::new(x, self.source_map).to_primitive()?,
            )),
            TsType::TsFnOrConstructorType(TsFnOrConstructorType::TsFnType(x)) => {
                return Err(SourceMapped::new(x, self.source_map).to_func().into())
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
