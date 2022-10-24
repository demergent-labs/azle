use std::collections::{HashMap, HashSet};

use super::AzleTypeElement;
use crate::ts_ast::{AzleTypeAliasDecl, GetDependencies};

impl GetDependencies for AzleTypeElement<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        match self {
            AzleTypeElement::AzlePropertySignature(azle_property_signature) => {
                azle_property_signature.get_dependent_types(type_alias_lookup, found_type_names)
            }
            AzleTypeElement::AzleMethodSignature(azle_method_signature) => {
                azle_method_signature.get_dependent_types(type_alias_lookup, found_type_names)
            }
        }
    }
}
