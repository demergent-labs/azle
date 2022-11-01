use std::collections::{HashMap, HashSet};

use super::AzleType;
use crate::ts_ast::{AzleTypeAliasDecl, GetDependencies};

impl GetDependencies for AzleType<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        match self {
            AzleType::AzleKeywordType(_) => HashSet::new(),
            AzleType::AzleTypeRef(azle_type_ref) => {
                azle_type_ref.get_dependent_types(type_alias_lookup, found_type_names)
            }
            AzleType::AzleTypeLit(azle_type_lit) => {
                azle_type_lit.get_dependent_types(type_alias_lookup, found_type_names)
            }
            AzleType::AzleArrayType(azle_array_type) => {
                azle_array_type.get_dependent_types(type_alias_lookup, found_type_names)
            }
            AzleType::AzleFnOrConstructorType(azle_fn_or_constructor_type) => {
                azle_fn_or_constructor_type.get_dependent_types(type_alias_lookup, found_type_names)
            }
            AzleType::AzleTupleType(azle_tuple_type) => {
                azle_tuple_type.get_dependent_types(type_alias_lookup, found_type_names)
            }
        }
    }
}
