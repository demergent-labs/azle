use super::{AzleTupleType, AzleType};
use crate::ts_ast::GetDependencies;

impl GetDependencies for AzleTupleType<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &std::collections::HashMap<String, crate::ts_ast::AzleTypeAliasDecl>,
        found_type_names: &std::collections::HashSet<String>,
    ) -> std::collections::HashSet<String> {
        self.ts_tuple_type
            .elem_types
            .iter()
            .fold(found_type_names.clone(), |acc, elem_type| {
                let ts_type = elem_type.ty.clone();
                let azle_type = AzleType::from_ts_type(ts_type, self.source_map);
                acc.union(&azle_type.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}
