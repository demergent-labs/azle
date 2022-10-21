use super::AzleFnOrConstructorType;
use crate::ts_ast::GetDependencies;

impl GetDependencies for AzleFnOrConstructorType<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &std::collections::HashMap<String, crate::ts_ast::AzleTypeAliasDecl>,
        found_type_names: &std::collections::HashSet<String>,
    ) -> std::collections::HashSet<String> {
        match self {
            AzleFnOrConstructorType::AzleFnType(azle_fn_type) => {
                azle_fn_type.get_dependent_types(type_alias_lookup, found_type_names)
            }
        }
    }
}
