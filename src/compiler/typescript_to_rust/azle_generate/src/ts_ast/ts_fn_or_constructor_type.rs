use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsFnOrConstructorType, TsTypeAliasDecl};

use super::ts_fn_type;

pub fn get_dependent_types_from_ts_fn_or_constructor_type(
    ts_fn_or_constructor_type: &TsFnOrConstructorType,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    match ts_fn_or_constructor_type {
        TsFnOrConstructorType::TsFnType(ts_fn_type) => {
            let param_types =
                ts_fn_type::get_param_types(ts_fn_type, type_alias_lookup, found_types);
            let return_type =
                ts_fn_type::get_return_type(ts_fn_type, type_alias_lookup, found_types);
            vec![return_type, param_types].concat()
        }
        TsFnOrConstructorType::TsConstructorType(_) => todo!(),
    }
}
