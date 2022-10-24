use std::collections::{HashMap, HashSet};

use crate::ts_ast::GetDependencies;

use super::AzleTypeAliasDecl;

pub struct AzleCanisterDecl<'a> {
    pub azle_type_alias: AzleTypeAliasDecl<'a>,
}

impl GetDependencies for AzleCanisterDecl<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        self.azle_type_alias
            .get_dependent_types(type_alias_lookup, found_type_names)
    }
}

impl GetDependencies for Vec<AzleCanisterDecl<'_>> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        self.iter()
            .fold(found_type_names.clone(), |acc, canister_decl| {
                acc.union(&canister_decl.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}
