use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{ClassDecl, ClassMember};

use crate::ts_ast::{ast_traits::GetDependencies, source_map::SourceMapped, AzleTypeAliasDecl};

impl GetDependencies for Vec<SourceMapped<'_, ClassDecl>> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        self.iter().fold(
            found_type_names.clone(),
            |acc, class_decl_with_source_map| {
                acc.union(&class_decl_with_source_map.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            },
        )
    }
}

impl GetDependencies for SourceMapped<'_, ClassDecl> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        self.class
            .body
            .iter()
            .fold(found_type_names.clone(), |acc, class_member| {
                if let ClassMember::ClassProp(class_prop) = class_member {
                    let class_prop_with_source_map = SourceMapped::new(class_prop, self.source_map);
                    let class_prop_dependent_types =
                        class_prop_with_source_map.get_dependent_types(type_alias_lookup, &acc);

                    acc.union(&class_prop_dependent_types).cloned().collect()
                } else {
                    acc
                }
            })
    }
}
