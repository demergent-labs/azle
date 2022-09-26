use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsArrayType, TsTypeAliasDecl};

use super::GetDependencies;

impl GetDependencies for TsArrayType {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> Vec<String> {
        self.elem_type
            .get_dependent_types(type_alias_lookup, found_types)
    }
}
