use crate::{
    cdk_act::ToActDataType,
    ts_ast::{source_map::GetSourceFileInfo, GetDependencies, ToDisplayString},
};
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

impl ToDisplayString for AzleFnOrConstructorType<'_> {
    fn to_display_string(&self) -> String {
        let span = match &self.ts_fn_or_constructor_type {
            TsFnOrConstructorType::TsFnType(fn_type) => fn_type.span,
            TsFnOrConstructorType::TsConstructorType(constructor_type) => constructor_type.span,
        };
        self.source_map.get_span_text(span)
    }
}

impl ToActDataType for AzleFnOrConstructorType<'_> {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> crate::cdk_act::ActDataType {
        todo!()
    }
}
