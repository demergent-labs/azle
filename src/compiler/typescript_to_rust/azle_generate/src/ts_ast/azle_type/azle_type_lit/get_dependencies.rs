use crate::ts_ast::GetDependencies;
use crate::ts_ast::GetTsType;

use super::{AzleType, AzleTypeLit};

impl GetDependencies for AzleTypeLit<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &std::collections::HashMap<String, crate::ts_ast::AzleTypeAliasDecl>,
        found_type_names: &std::collections::HashSet<String>,
    ) -> std::collections::HashSet<String> {
        self.ts_type_lit
            .members
            .iter()
            .fold(found_type_names.clone(), |acc, member| {
                let ts_type = member.get_ts_type();
                let azle_type = AzleType::from_ts_type(ts_type, self.source_map);
                acc.union(&azle_type.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}
