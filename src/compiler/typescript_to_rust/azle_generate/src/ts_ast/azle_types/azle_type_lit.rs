use swc_common::SourceMap;
use swc_ecma_ast::TsTypeLit;

use crate::{
    cdk_act::ActDataType,
    ts_ast::{source_map::GetSourceFileInfo, GetDependencies, GetSourceText},
};

#[derive(Clone)]
pub struct AzleTypeLit<'a> {
    pub ts_type_lit: TsTypeLit,
    pub source_map: &'a SourceMap,
}

impl AzleTypeLit<'_> {
    pub fn to_record(&self, alias_name: &Option<&String>) -> ActDataType {
        todo!()
    }
    pub fn to_variant(&self, alias_name: &Option<&String>) -> ActDataType {
        todo!()
    }
}

impl GetDependencies for AzleTypeLit<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &std::collections::HashMap<String, crate::ts_ast::AzleTypeAliasDecl>,
        found_type_names: &std::collections::HashSet<String>,
    ) -> std::collections::HashSet<String> {
        self.ts_type_lit
            .get_dependent_types(type_alias_lookup, found_type_names)
    }
}

impl GetSourceText for AzleTypeLit<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_text(self.ts_type_lit.span)
    }
}
