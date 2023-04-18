use swc_common::SourceMap;
use swc_ecma_ast::{
    TsFnOrConstructorType, TsKeywordType, TsTupleType, TsType, TsTypeLit, TsTypeRef,
};

use crate::ts_ast::SourceMapped;

mod errors;
mod get_source_info;
mod to_candid_type;
mod ts_fn_or_constructor_type;
mod ts_keyword_type;
mod ts_type_ref;

pub mod ts_type_lit;

#[derive(Clone)]
pub enum AzleType<'a> {
    AzleKeywordType(SourceMapped<'a, TsKeywordType>),
    AzleTypeLit(SourceMapped<'a, TsTypeLit>),
    AzleTypeRef(SourceMapped<'a, TsTypeRef>),
    AzleFnOrConstructorType(SourceMapped<'a, TsFnOrConstructorType>),
    AzleTupleType(SourceMapped<'a, TsTupleType>),
}

impl<'a> AzleType<'a> {
    pub fn as_ts_type_lit(self) -> Option<SourceMapped<'a, TsTypeLit>> {
        match self {
            AzleType::AzleTypeLit(ts_type_lit) => {
                Some(SourceMapped::new(&ts_type_lit, self.source_map))
            }
            _ => None,
        }
    }

    pub fn as_azle_tuple_type(self) -> Option<SourceMapped<'a, TsTupleType>> {
        match self {
            AzleType::AzleTupleType(ts_tuple_type) => {
                Some(SourceMapped::new(&ts_tuple_type, self.source_map))
            }
            _ => None,
        }
    }

    // pub fn as_azle_type_ref(self) -> Option<AzleTypeRef<'a>> {
    //     match self {
    //         AzleType::AzleTypeRef(azle_type_ref) => Some(azle_type_ref),
    //         _ => None,
    //     }
    // }

    // It seems like these would be useful, but we aren't using them right now,
    // but they can hang out here until we are done that way if we need them
    // they are here. though its not like they are that hard to write up from
    // scratch...
    // pub fn is_azle_type_lit(&self) -> bool {
    //     match self {
    //         AzleType::AzleTypeLit(_) => true,
    //         _ => false,
    //     }
    // }
    //
    // pub fn is_azle_type_ref(&self) -> bool {
    //     match self {
    //         AzleType::AzleTypeRef(_) => true,
    //         _ => false,
    //     }
    // }
}

impl AzleType<'_> {
    pub fn from_ts_type(ts_type: TsType, source_map: &SourceMap) -> AzleType {
        match ts_type {
            TsType::TsKeywordType(ts_keyword_type) => {
                AzleType::AzleKeywordType(SourceMapped::new(&ts_keyword_type, source_map))
            }
            TsType::TsFnOrConstructorType(ts_fn_or_constructor_type) => {
                AzleType::AzleFnOrConstructorType(SourceMapped::new(
                    &ts_fn_or_constructor_type,
                    source_map,
                ))
            }
            TsType::TsTypeRef(ts_type_ref) => {
                AzleType::AzleTypeRef(SourceMapped::new(&ts_type_ref, source_map))
            }
            TsType::TsTypeLit(ts_type_lit) => {
                AzleType::AzleTypeLit(SourceMapped::new(&ts_type_lit, source_map))
            }
            TsType::TsTupleType(ts_tuple_type) => {
                AzleType::AzleTupleType(SourceMapped::new(&ts_tuple_type, source_map))
            }
            _ => panic!("{}", errors::unsupported_type_error(ts_type, source_map)),
        }
    }
}
