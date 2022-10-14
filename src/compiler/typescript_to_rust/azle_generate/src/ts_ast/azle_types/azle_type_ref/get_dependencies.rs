use std::collections::{HashMap, HashSet};

use crate::ts_ast::{AzleTypeAliasDecl, GetDependencies};

use super::AzleTypeRef;

impl GetDependencies for AzleTypeRef<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        self.ts_type_ref
            .get_dependent_types(type_alias_lookup, found_type_names)
    }
}
