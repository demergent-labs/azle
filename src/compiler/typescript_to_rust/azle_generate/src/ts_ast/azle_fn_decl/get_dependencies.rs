use std::collections::{HashMap, HashSet};

use super::AzleFnDecl;
use crate::ts_ast::{ast_traits::GetDependencies, azle_type::AzleType, AzleTypeAliasDecl};

impl GetDependencies for Vec<AzleFnDecl<'_>> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        // TODO the found types are resetting every once and a while. I am
        // guessing it's as we start another function or maybe a different type
        // in that function. Either way it might be slightly more efficient to
        // continually build up the list to avoid redundancy
        self.iter()
            .fold(found_type_names.clone(), |acc, azle_fn_decl| {
                acc.union(&azle_fn_decl.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}

impl GetDependencies for AzleFnDecl<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        let return_types = self.get_return_ts_type();
        let param_types = self.get_param_ts_types();
        let ts_types = vec![vec![return_types], param_types].concat();

        ts_types
            .iter()
            .fold(found_type_names.clone(), |acc, ts_type| {
                let azle_type = AzleType::from_ts_type(ts_type.clone().clone(), self.source_map);
                acc.union(&azle_type.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}
