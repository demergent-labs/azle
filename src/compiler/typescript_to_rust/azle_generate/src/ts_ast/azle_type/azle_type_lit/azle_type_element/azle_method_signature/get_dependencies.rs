use std::collections::{HashMap, HashSet};

use super::AzleMethodSignature;
use crate::ts_ast::{
    azle_functions_and_methods::FunctionAndMethodTypeHelperMethods, azle_type::AzleType,
    AzleTypeAliasDecl, GetDependencies,
};

impl GetDependencies for AzleMethodSignature<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        let return_types = match self.get_return_type() {
            Some(return_type) => vec![return_type],
            None => vec![],
        };
        let param_types = self.get_param_types();
        let ts_types = vec![return_types, param_types].concat();
        ts_types
            .iter()
            .fold(found_type_names.clone(), |acc, ts_type| {
                let azle_type = AzleType::from_ts_type(ts_type.clone(), self.source_map);
                acc.union(&azle_type.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}
