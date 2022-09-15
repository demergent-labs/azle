use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsEntityName, TsType, TsTypeAliasDecl};

use super::{
    ident, ts_array_type, ts_fn_or_constructor_type, ts_tuple_type, ts_type_lit, ts_type_ref,
};

pub fn get_dependent_types_for_ts_type(
    ts_type: &TsType,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    match ts_type {
        TsType::TsKeywordType(_) => vec![],
        TsType::TsTypeRef(ts_type_ref) => ts_type_ref::get_dependent_types_from_type_ref(
            ts_type_ref,
            type_alias_lookup,
            found_types,
        ),
        TsType::TsTypeLit(ts_type_lit) => ts_type_lit::get_dependent_types_from_ts_type_lit(
            ts_type_lit,
            type_alias_lookup,
            found_types,
        ),
        TsType::TsArrayType(ts_array_type) => ts_array_type::get_dependent_types_from_array_type(
            ts_array_type,
            type_alias_lookup,
            found_types,
        ),
        TsType::TsFnOrConstructorType(ts_fn_or_constructor_type) => {
            ts_fn_or_constructor_type::get_dependent_types_from_ts_fn_or_constructor_type(
                ts_fn_or_constructor_type,
                type_alias_lookup,
                found_types,
            )
        }
        TsType::TsTupleType(ts_tuple_type) => {
            ts_tuple_type::get_dependent_types_from_ts_tuple_type(
                ts_tuple_type,
                type_alias_lookup,
                found_types,
            )
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

pub fn get_identifier_name_for_ts_type(ts_type: &TsType) -> Option<String> {
    match ts_type {
        TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
            TsEntityName::Ident(ident) => Some(ident::ident_to_string(&ident)),
            _ => None,
        },
        _ => None,
    }
}
