use swc_ecma_ast::ClassProp;

use crate::ts_ast::{ast_traits::GetDependencies, azle_type::AzleType, source_map::SourceMapped};

impl GetDependencies for SourceMapped<'_, ClassProp> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &std::collections::HashMap<String, crate::ts_ast::AzleTypeAliasDecl>,
        found_type_names: &std::collections::HashSet<String>,
    ) -> std::collections::HashSet<String> {
        let return_types = self.return_ts_type().unwrap(); // Considering unwrap safe because errors should have been caught when parsing the nodes, not the dependencies
        let param_types = self.param_ts_types().unwrap(); // Considering unwrap safe because errors should have been caught when parsing the nodes, not the dependencies
        let ts_types = vec![vec![return_types], param_types].concat();

        ts_types
            .iter()
            .fold(found_type_names.clone(), |acc, ts_type| {
                let azle_type = AzleType::from_ts_type(ts_type.clone().clone(), self.source_map);
                acc.union(&azle_type.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}
