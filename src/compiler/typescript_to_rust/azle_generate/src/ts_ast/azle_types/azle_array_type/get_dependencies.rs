use super::AzleArrayType;
use crate::ts_ast::{AzleTypeAliasDecl, GetDependencies};
use std::collections::{HashMap, HashSet};

impl GetDependencies for AzleArrayType<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        self.ts_array_type
            .get_dependent_types(type_alias_lookup, found_type_names)
    }
}
