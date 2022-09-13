use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsArrayType, TsTypeAliasDecl};

use super::ts_type::get_dependent_types_for_ts_type;

pub fn get_dependent_types_from_array_type(
    ts_array_type: &TsArrayType,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    let elem_type = *ts_array_type.elem_type.clone();
    get_dependent_types_for_ts_type(&elem_type, type_alias_lookup, found_types)
}
