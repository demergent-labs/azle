use std::ops::Deref;
use swc_ecma_ast::{TsFnOrConstructorType, TsType};

use cdk_framework::act::node::CandidType;

use crate::{ts_ast::SourceMapped, Error};

use super::errors::{UnexpectedTsTupleTypes, UnexpectedTsType, UnexpectedTsTypeLiteral};

impl SourceMapped<'_, TsType> {
    pub fn to_candid_type(&self) -> Result<CandidType, Vec<Error>> {
        match self.deref() {
            TsType::TsKeywordType(x) => Ok(CandidType::Primitive(
                SourceMapped::new_from_parent(x, self).to_primitive()?,
            )),
            TsType::TsFnOrConstructorType(TsFnOrConstructorType::TsFnType(x)) => {
                return Err(SourceMapped::new_from_parent(x, self).to_func().into())
            }
            TsType::TsTypeRef(x) => SourceMapped::new_from_parent(x, self).to_candid_type(),
            TsType::TsTypeLit(_) => {
                return Err(vec![UnexpectedTsTypeLiteral::from_ts_type(self).into()]);
            }
            TsType::TsTupleType(_) => {
                return Err(vec![UnexpectedTsTupleTypes::from_ts_type(self).into()]);
            }
            _ => {
                return Err(vec![UnexpectedTsType::from_ts_type(self).into()]);
            }
        }
    }
}
