use swc_common::SourceMap;
use swc_ecma_ast::TsTypeRef;

use crate::{
    cdk_act::ToActDataType,
    ts_ast::{GetDependencies, GetName},
};

#[derive(Clone)]
pub struct AzleTypeRef<'a> {
    pub ts_type_ref: TsTypeRef,
    pub source_map: &'a SourceMap,
}

impl GetDependencies for AzleTypeRef<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &std::collections::HashMap<String, crate::ts_ast::AzleTypeAliasDecl>,
        found_type_names: &std::collections::HashSet<String>,
    ) -> std::collections::HashSet<String> {
        self.ts_type_ref
            .get_dependent_types(type_alias_lookup, found_type_names)
    }
}

impl GetName for AzleTypeRef<'_> {
    fn get_name(&self) -> &str {
        self.ts_type_ref.get_name()
    }
}

impl ToActDataType for AzleTypeRef<'_> {
    fn to_act_data_type(
        &self,
        alias_name: &Option<&String>,
        source_map: &SourceMap,
    ) -> crate::cdk_act::ActDataType {
        todo!()
    }
}
