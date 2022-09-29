use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsFnOrConstructorType, TsTypeAliasDecl};

use super::GetDependencies;

impl GetDependencies for TsFnOrConstructorType {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> HashSet<String> {
        match self {
            TsFnOrConstructorType::TsFnType(ts_fn_type) => {
                ts_fn_type.get_dependent_types(type_alias_lookup, found_types)
            }
            TsFnOrConstructorType::TsConstructorType(_) => todo!(),
        }
    }
}
