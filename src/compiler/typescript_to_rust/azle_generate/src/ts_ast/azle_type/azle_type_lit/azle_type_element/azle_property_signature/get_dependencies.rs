use std::collections::{HashMap, HashSet};

use crate::ts_ast::{azle_type::AzleType, AzleTypeAliasDecl, GetDependencies, GetTsType};

use super::AzlePropertySignature;

impl GetDependencies for AzlePropertySignature<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        let ts_type = match &self.ts_property_signature.type_ann {
            Some(ts_type_ann) => ts_type_ann.get_ts_type(),
            None => panic!("{}", self.no_type_annotation_error()),
        };
        let azle_type = AzleType::from_ts_type(ts_type, self.source_map);
        azle_type.get_dependent_types(type_alias_lookup, &found_type_names)
    }
}
