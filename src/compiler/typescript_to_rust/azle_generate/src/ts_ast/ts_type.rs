use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsEntityName, TsType, TsTypeAliasDecl};

use crate::cdk_act::{ActDataType, ToActDataType};

use super::{ident, ts_type_lit::TsTypeLitHelperMethods, GetDependencies};

pub fn get_identifier_name_for_ts_type(ts_type: &TsType) -> Option<String> {
    match ts_type {
        TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
            TsEntityName::Ident(ident) => Some(ident::ident_to_string(&ident)),
            _ => None,
        },
        _ => None,
    }
}

impl GetDependencies for TsType {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> Vec<String> {
        match self {
            TsType::TsKeywordType(_) => vec![],
            TsType::TsTypeRef(ts_type_ref) => {
                ts_type_ref.get_dependent_types(type_alias_lookup, found_types)
            }
            TsType::TsTypeLit(ts_type_lit) => {
                ts_type_lit.get_dependent_types(type_alias_lookup, found_types)
            }
            TsType::TsArrayType(ts_array_type) => {
                ts_array_type.get_dependent_types(type_alias_lookup, found_types)
            }
            TsType::TsFnOrConstructorType(ts_fn_or_constructor_type) => {
                ts_fn_or_constructor_type.get_dependent_types(type_alias_lookup, found_types)
            }
            TsType::TsTupleType(ts_tuple_type) => {
                ts_tuple_type.get_dependent_types(type_alias_lookup, found_types)
            }
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

impl ToActDataType for TsType {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> ActDataType {
        match self {
            TsType::TsKeywordType(ts_keyword_type) => ts_keyword_type.to_act_data_type(alias_name),
            TsType::TsTypeRef(ts_type_ref) => ts_type_ref.to_act_data_type(alias_name),
            TsType::TsArrayType(ts_array_type) => ts_array_type.to_act_data_type(alias_name),
            TsType::TsTypeLit(ts_type_lit) => ts_type_lit.to_record(alias_name),
            TsType::TsTupleType(ts_tuple_type) => ts_tuple_type.to_act_data_type(alias_name),
            TsType::TsThisType(_) => todo!("to_act_data_type for TsThisType"),
            TsType::TsFnOrConstructorType(_) => {
                todo!("to_act_data_type for TsFnOorConstructorType")
            }
            TsType::TsTypeQuery(_) => todo!("to_act_data_type for TsTypeQuery"),
            TsType::TsOptionalType(_) => todo!("to_act_data_type for TsOptionalType"),
            TsType::TsRestType(_) => todo!("to_act_data_type for TsRestType"),
            TsType::TsUnionOrIntersectionType(_) => {
                todo!("to_act_data_type for TsUnionOrIntersectionType")
            }
            TsType::TsConditionalType(_) => todo!("to_act_data_type for TsConditionalType"),
            TsType::TsInferType(_) => todo!("to_act_data_type for TsInferType"),
            TsType::TsParenthesizedType(_) => todo!("to_act_data_type for TsParenthesizedType"),
            TsType::TsTypeOperator(_) => todo!("to_act_data_type for TsTypeOperator"),
            TsType::TsIndexedAccessType(_) => todo!("to_act_data_type for TsIndexedAccessType"),
            TsType::TsMappedType(_) => todo!("to_act_data_type for TsMappedType"),
            TsType::TsLitType(_) => todo!("to_act_data_type for TsLitType"),
            TsType::TsTypePredicate(_) => todo!("to_act_data_type for TsTypePredicate"),
            TsType::TsImportType(_) => todo!("to_act_data_type for TsImportType"),
        }
    }
}
