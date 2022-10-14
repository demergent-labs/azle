use crate::{cdk_act::ToActDataType, ts_ast::GetDependencies};
use swc_common::SourceMap;
use swc_ecma_ast::TsFnOrConstructorType;

#[derive(Clone)]
pub struct AzleFnOrConstructorType<'a> {
    pub ts_fn_or_constructor_type: TsFnOrConstructorType,
    pub source_map: &'a SourceMap,
}

impl GetDependencies for AzleFnOrConstructorType<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &std::collections::HashMap<String, crate::ts_ast::AzleTypeAliasDecl>,
        found_type_names: &std::collections::HashSet<String>,
    ) -> std::collections::HashSet<String> {
        self.ts_fn_or_constructor_type
            .get_dependent_types(type_alias_lookup, found_type_names)
    }
}

impl ToActDataType for AzleFnOrConstructorType<'_> {
    fn to_act_data_type(
        &self,
        alias_name: &Option<&String>,
        source_map: &SourceMap,
    ) -> crate::cdk_act::ActDataType {
        todo!()
    }
}
