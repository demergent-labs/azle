use std::{
    collections::{HashMap, HashSet},
    iter::FromIterator,
};

use super::AzleTypeRef;
use crate::ts_ast::{
    azle_type::{AzleFnOrConstructorType, AzleType},
    AzleTypeAliasDecl, GetDependencies, GetName,
};

impl GetDependencies for AzleTypeRef<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        match self.get_name() {
            "blob" => HashSet::new(),
            "float32" => HashSet::new(),
            "float64" => HashSet::new(),
            "int" => HashSet::new(),
            "int8" => HashSet::new(),
            "int16" => HashSet::new(),
            "int32" => HashSet::new(),
            "int64" => HashSet::new(),
            "nat" => HashSet::new(),
            "nat8" => HashSet::new(),
            "nat16" => HashSet::new(),
            "nat32" => HashSet::new(),
            "nat64" => HashSet::new(),
            "Principal" => HashSet::new(),
            "empty" => HashSet::new(),
            "reserved" => HashSet::new(),
            "Opt" => self
                .get_enclosed_azle_type()
                .get_dependent_types(type_alias_lookup, found_type_names),
            "Func" => {
                let request_type_type_ref = match self.get_enclosed_azle_type() {
                    AzleType::AzleTypeRef(azle_type_ref) => azle_type_ref,
                    _ => panic!("{}", self.wrong_enclosed_type_error()),
                };

                let mode = request_type_type_ref.get_name();
                if !(mode == "Query" || mode == "Update" || mode == "Oneway") {
                    panic!("{}", self.wrong_enclosed_type_error())
                };
                let azle_fn_type = match request_type_type_ref.get_enclosed_azle_type() {
                    AzleType::AzleFnOrConstructorType(fn_or_const) => match fn_or_const {
                        AzleFnOrConstructorType::AzleFnType(ts_fn_type) => ts_fn_type,
                    },
                    _ => panic!("{}", self.wrong_enclosed_type_error()),
                };
                azle_fn_type.get_dependent_types(type_alias_lookup, found_type_names)
            }
            "Variant" => self
                .get_enclosed_azle_type()
                .get_dependent_types(type_alias_lookup, found_type_names),
            "Record" => self
                .get_enclosed_azle_type()
                .get_dependent_types(type_alias_lookup, found_type_names),
            "Canister" => self
                .get_enclosed_azle_type()
                .get_dependent_types(type_alias_lookup, found_type_names),
            _ => {
                let name = self.get_name().to_string();
                if found_type_names.contains(&name) {
                    return HashSet::new();
                }
                match type_alias_lookup.clone().get(&name) {
                    Some(decl) => {
                        let new_type: HashSet<String> =
                            HashSet::from_iter(vec![name].iter().cloned());
                        let found_type_names: HashSet<String> =
                            found_type_names.clone().union(&new_type).cloned().collect();
                        // When finding a new type return it and all of it's dependents
                        found_type_names
                            .union(&decl.get_dependent_types(type_alias_lookup, &found_type_names))
                            .cloned()
                            .collect()
                    }
                    None => HashSet::new(),
                }
            }
        }
    }
}
