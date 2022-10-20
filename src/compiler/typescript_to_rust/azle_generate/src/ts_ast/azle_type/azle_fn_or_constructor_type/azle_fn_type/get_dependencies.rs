use std::collections::{HashMap, HashSet};

use super::AzleFnType;
use crate::ts_ast::{
    azle_type::AzleType, AzleTypeAliasDecl, FunctionAndMethodTypeHelperMethods, GetDependencies,
};

impl GetDependencies for AzleFnType<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        let return_type = match self.get_return_type() {
            Some(return_type) => vec![return_type],
            None => vec![],
        };
        vec![self.get_param_types(), return_type]
            .concat()
            .iter()
            .fold(found_type_names.clone(), |acc, ts_type| {
                let azle_type = AzleType::from_ts_type(ts_type.clone(), self.source_map);
                acc.union(&azle_type.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}
