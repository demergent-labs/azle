use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsTupleType, TsTypeAliasDecl};

use super::ts_type::get_dependent_types_for_ts_type;

pub fn get_dependent_types_from_ts_tuple_type(
    ts_tuple_type: &TsTupleType,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    ts_tuple_type
        .elem_types
        .iter()
        .fold(vec![], |acc, elem_type| {
            vec![
                acc,
                get_dependent_types_for_ts_type(&elem_type.ty, type_alias_lookup, found_types),
            ]
            .concat()
        })
}
