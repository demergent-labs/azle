use std::ops::Deref;
use swc_ecma_ast::{TsFnOrConstructorType, TsType};

use cdk_framework::act::node::CandidType;

use crate::{traits::GetSourceInfo, ts_ast::SourceMapped, Error};

use super::errors::{UnexpectedTsTupleTypes, UnexpectedTsType, UnexpectedTsTypeLiteral};

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
                let _origin = self.get_origin();
                let _line_number = self.get_line_number();
                let range = self.get_range();
                let _column_number = range.0 + 1;

                return Err(vec![UnexpectedTsTypeLiteral::from_ts_type(self).into()]);
            }
            TsType::TsTupleType(_) => {
                let _origin = self.get_origin();
                let _line_number = self.get_line_number();
                let range = self.get_range();
                let _column_number = range.0 + 1;

                return Err(vec![UnexpectedTsTupleTypes::from_ts_type(self).into()]);
            }
            _ => {
                let _origin = self.get_origin();
                let _line_number = self.get_line_number();
                let range = self.get_range();
                let _column_number = range.0 + 1;

                return Err(vec![UnexpectedTsType::from_ts_type(self).into()]);
            }
        }
    }
}
