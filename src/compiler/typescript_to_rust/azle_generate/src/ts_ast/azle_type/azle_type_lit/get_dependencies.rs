use super::{AzleTypeElement, AzleTypeLit};
use crate::ts_ast::GetDependencies;

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
                let azle_type_element =
                    AzleTypeElement::from_ts_type_element(member.clone(), self.source_map);
                acc.union(&azle_type_element.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}
