use std::collections::{HashMap, HashSet};
use swc_ecma_ast::TsFnOrConstructorType;

use super::{AzleTypeAliasDecl, GetDependencies, GetSourceText};

impl GetDependencies for TsFnOrConstructorType {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
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

impl GetSourceText for TsFnOrConstructorType {
    fn get_source_text(&self) -> String {
        match self {
            TsFnOrConstructorType::TsFnType(ts_fn_type) => ts_fn_type.get_source_text(),
            TsFnOrConstructorType::TsConstructorType(_) => todo!(),
        }
    }
}
