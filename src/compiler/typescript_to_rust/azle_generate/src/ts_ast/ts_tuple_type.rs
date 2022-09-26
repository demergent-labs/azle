use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsTupleType, TsTypeAliasDecl};

use super::GetDependencies;

impl GetDependencies for TsTupleType {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> Vec<String> {
        self.elem_types.iter().fold(vec![], |acc, elem_type| {
            vec![
                acc,
                elem_type
                    .ty
                    .get_dependent_types(type_alias_lookup, found_types),
            ]
            .concat()
        })
    }
}
