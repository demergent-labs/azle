use std::collections::{HashMap, HashSet};
use swc_ecma_ast::TsFnOrConstructorType;

use super::{AzleTypeAlias, GetDependencies, ToDisplayString};

impl GetDependencies for TsFnOrConstructorType {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAlias>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        match self {
            TsFnOrConstructorType::TsFnType(ts_fn_type) => {
                ts_fn_type.get_dependent_types(type_alias_lookup, found_type_names)
            }
            TsFnOrConstructorType::TsConstructorType(_) => todo!(),
        }
    }
}

impl ToDisplayString for TsFnOrConstructorType {
    fn to_display_string(&self) -> String {
        match self {
            TsFnOrConstructorType::TsFnType(ts_fn_type) => ts_fn_type.to_display_string(),
            TsFnOrConstructorType::TsConstructorType(_) => todo!(),
        }
    }
}
