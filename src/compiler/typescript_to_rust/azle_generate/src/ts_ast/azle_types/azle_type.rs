use super::{
    AzleArrayType, AzleFnOrConstructorType, AzleKeywordType, AzleTupleType, AzleTypeLit,
    AzleTypeRef,
};
use crate::{
    cdk_act::{ActDataType, ToActDataType},
    ts_ast::{AzleTypeAliasDecl, GetDependencies},
};
use std::collections::{HashMap, HashSet};
use swc_common::SourceMap;
use swc_ecma_ast::TsType;

pub enum AzleType<'a> {
    AzleKeywordType(AzleKeywordType<'a>),
    AzleTypeRef(AzleTypeRef<'a>),
    AzleTypeLit(AzleTypeLit<'a>),
    AzleArrayType(AzleArrayType<'a>),
    AzleFnOrConstructorType(AzleFnOrConstructorType<'a>),
    AzleTupleType(AzleTupleType<'a>),
}

impl<'a> AzleType<'a> {
    pub fn as_azle_type_lit(self) -> Option<AzleTypeLit<'a>> {
        match self {
            AzleType::AzleTypeLit(azle_type_lit) => Some(azle_type_lit),
            _ => None,
        }
    }

    pub fn is_azle_type_lit(&self) -> bool {
        match self {
            AzleType::AzleTypeLit(_) => true,
            _ => false,
        }
    }
}

impl AzleType<'_> {
    pub fn from_ts_type(ts_type: TsType, source_map: &SourceMap) -> AzleType {
        match ts_type {
            TsType::TsKeywordType(ts_keyword_type) => AzleType::AzleKeywordType(AzleKeywordType {
                ts_keyword_type,
                source_map,
            }),
            TsType::TsFnOrConstructorType(ts_fn_or_constructor_type) => {
                AzleType::AzleFnOrConstructorType(AzleFnOrConstructorType {
                    ts_fn_or_constructor_type,
                    source_map,
                })
            }
            TsType::TsTypeRef(ts_type_ref) => AzleType::AzleTypeRef(AzleTypeRef {
                ts_type_ref,
                source_map,
            }),
            TsType::TsTypeLit(ts_type_lit) => AzleType::AzleTypeLit(AzleTypeLit {
                ts_type_lit,
                source_map,
            }),
            TsType::TsArrayType(ts_array_type) => AzleType::AzleArrayType(AzleArrayType {
                ts_array_type,
                source_map,
            }),
            TsType::TsTupleType(ts_tuple_type) => AzleType::AzleTupleType(AzleTupleType {
                ts_tuple_type,
                source_map,
            }),
            TsType::TsThisType(_) => todo!(),
            TsType::TsTypeQuery(_) => todo!(),
            TsType::TsOptionalType(_) => todo!(),
            TsType::TsRestType(_) => todo!(),
            TsType::TsUnionOrIntersectionType(_) => todo!(),
            TsType::TsConditionalType(_) => todo!(),
            TsType::TsInferType(_) => todo!(),
            TsType::TsParenthesizedType(_) => todo!(),
            TsType::TsTypeOperator(_) => todo!(),
            TsType::TsIndexedAccessType(_) => todo!(),
            TsType::TsMappedType(_) => todo!(),
            TsType::TsLitType(_) => todo!(),
            TsType::TsTypePredicate(_) => todo!(),
            TsType::TsImportType(_) => todo!(),
        }
    }
}

impl GetDependencies for AzleType<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        match self {
            AzleType::AzleKeywordType(_) => HashSet::new(),
            AzleType::AzleTypeRef(azle_type_ref) => {
                azle_type_ref.get_dependent_types(type_alias_lookup, found_type_names)
            }
            AzleType::AzleTypeLit(azle_type_lit) => {
                azle_type_lit.get_dependent_types(type_alias_lookup, found_type_names)
            }
            AzleType::AzleArrayType(azle_array_type) => {
                azle_array_type.get_dependent_types(type_alias_lookup, found_type_names)
            }
            AzleType::AzleFnOrConstructorType(azle_fn_or_constructor_type) => {
                azle_fn_or_constructor_type.get_dependent_types(type_alias_lookup, found_type_names)
            }
            AzleType::AzleTupleType(azle_tuple_type) => {
                azle_tuple_type.get_dependent_types(type_alias_lookup, found_type_names)
            }
        }
    }
}

impl ToActDataType for AzleType<'_> {
    fn to_act_data_type(
        &self,
        alias_name: &Option<&String>,
        source_map: &SourceMap,
    ) -> ActDataType {
        match self {
            AzleType::AzleKeywordType(azle_keyword_type) => {
                azle_keyword_type.to_act_data_type(alias_name, source_map)
            }
            AzleType::AzleTypeRef(azle_type_ref) => {
                azle_type_ref.to_act_data_type(alias_name, source_map)
            }
            AzleType::AzleArrayType(azle_array_type) => {
                azle_array_type.to_act_data_type(alias_name, source_map)
            }
            AzleType::AzleTypeLit(azle_type_lit) => azle_type_lit.to_record(alias_name, source_map),
            AzleType::AzleTupleType(azle_tuple_type) => {
                azle_tuple_type.to_act_data_type(alias_name, source_map)
            }
            AzleType::AzleFnOrConstructorType(_) => todo!(),
        }
    }
}
