use swc_common::SourceMap;
use swc_ecma_ast::TsTupleType;

use crate::{
    cdk_act::ToActDataType,
    ts_ast::{source_map::GetSourceFileInfo, GetDependencies, ToDisplayString},
};

#[derive(Clone)]
pub struct AzleTupleType<'a> {
    pub ts_tuple_type: TsTupleType,
    pub source_map: &'a SourceMap,
}

impl GetDependencies for AzleTupleType<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &std::collections::HashMap<String, crate::ts_ast::AzleTypeAliasDecl>,
        found_type_names: &std::collections::HashSet<String>,
    ) -> std::collections::HashSet<String> {
        self.ts_tuple_type
            .get_dependent_types(type_alias_lookup, found_type_names)
    }
}

impl ToDisplayString for AzleTupleType<'_> {
    fn to_display_string(&self) -> String {
        self.source_map.get_span_text(self.ts_tuple_type.span)
    }
}

impl ToActDataType for AzleTupleType<'_> {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> crate::cdk_act::ActDataType {
        todo!()
    }
}
