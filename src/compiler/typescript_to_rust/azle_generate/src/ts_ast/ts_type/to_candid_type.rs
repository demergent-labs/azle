use std::ops::Deref;
use swc_ecma_ast::{TsFnOrConstructorType, TsType};

use cdk_framework::act::node::CandidType;

use crate::{ts_ast::SourceMapped, Error};

use super::errors::{UnexpectedTsTupleTypes, UnexpectedTsType, UnexpectedTsTypeLiteral};

impl SourceMapped<'_, TsType> {
    pub fn to_candid_type(&self) -> Result<CandidType, Vec<Error>> {
        match self.deref() {
            TsType::TsKeywordType(x) => Ok(CandidType::Primitive(self.spawn(x).to_primitive()?)),
            TsType::TsFnOrConstructorType(TsFnOrConstructorType::TsFnType(x)) => {
                return Err(self.spawn(x).to_func().into())
            }
            TsType::TsTypeRef(x) => self.spawn(x).to_candid_type(),
            TsType::TsTypeLit(_) => {
                return Err(vec![UnexpectedTsTypeLiteral::from_ts_type(self).into()]);
            }
            TsType::TsTupleType(_) => {
                return Err(vec![UnexpectedTsTupleTypes::from_ts_type(self).into()]);
            }
            TsType::TsArrayType(_) => {
                return Err(vec![UnexpectedTsType::from_ts_type(self).into()]);
            }
            _ => {
                return Err(vec![UnexpectedTsType::from_ts_type(self).into()]);
            }
        }
    }
}
