use std::collections::{HashMap, HashSet};

use super::AzleArrayType;
use crate::ts_ast::{AzleTypeAliasDecl, GetDependencies};

impl GetDependencies for AzleArrayType<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        self.get_azle_elem()
            .get_dependent_types(type_alias_lookup, found_type_names)
    }
}
