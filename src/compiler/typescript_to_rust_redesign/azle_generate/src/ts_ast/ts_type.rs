use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsType, TsTypeAliasDecl};

use super::{
    ts_array_type::get_dependent_types_from_array_type,
    ts_fn_or_constructor_type::get_dependent_types_from_ts_fn_or_constructor_type,
    ts_tuple_type::get_dependent_types_from_ts_tuple_type,
    ts_type_lit::get_dependent_types_from_ts_type_lit,
    ts_type_ref::get_dependent_types_from_type_ref,
};

pub fn get_dependent_types_for_ts_type(
    ts_type: &TsType,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    match ts_type {
        swc_ecma_ast::TsType::TsKeywordType(_) => vec![],
        swc_ecma_ast::TsType::TsTypeRef(ts_type_ref) => {
            get_dependent_types_from_type_ref(ts_type_ref, type_alias_lookup, found_types)
        }
        swc_ecma_ast::TsType::TsTypeLit(ts_type_lit) => {
            get_dependent_types_from_ts_type_lit(ts_type_lit, type_alias_lookup, found_types)
        }
        swc_ecma_ast::TsType::TsArrayType(ts_array_type) => {
            get_dependent_types_from_array_type(ts_array_type, type_alias_lookup, found_types)
        }
        swc_ecma_ast::TsType::TsFnOrConstructorType(ts_fn_or_constructor_type) => {
            get_dependent_types_from_ts_fn_or_constructor_type(
                ts_fn_or_constructor_type,
                type_alias_lookup,
                found_types,
            )
        }
        swc_ecma_ast::TsType::TsTupleType(ts_tuple_type) => {
            get_dependent_types_from_ts_tuple_type(ts_tuple_type, type_alias_lookup, found_types)
        }
        swc_ecma_ast::TsType::TsThisType(_) => todo!(),
        swc_ecma_ast::TsType::TsTypeQuery(_) => todo!(),
        swc_ecma_ast::TsType::TsOptionalType(_) => todo!(),
        swc_ecma_ast::TsType::TsRestType(_) => todo!(),
        swc_ecma_ast::TsType::TsUnionOrIntersectionType(_) => todo!(),
        swc_ecma_ast::TsType::TsConditionalType(_) => todo!(),
        swc_ecma_ast::TsType::TsInferType(_) => todo!(),
        swc_ecma_ast::TsType::TsParenthesizedType(_) => todo!(),
        swc_ecma_ast::TsType::TsTypeOperator(_) => todo!(),
        swc_ecma_ast::TsType::TsIndexedAccessType(_) => todo!(),
        swc_ecma_ast::TsType::TsMappedType(_) => todo!(),
        swc_ecma_ast::TsType::TsLitType(_) => todo!(),
        swc_ecma_ast::TsType::TsTypePredicate(_) => todo!(),
        swc_ecma_ast::TsType::TsImportType(_) => todo!(),
    }
}
