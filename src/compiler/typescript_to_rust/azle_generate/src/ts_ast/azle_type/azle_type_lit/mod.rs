use swc_common::SourceMap;
use swc_ecma_ast::TsTypeLit;

pub mod get_source_info;
pub mod ts_type_element;

#[derive(Clone)]
pub struct AzleTypeLit<'a> {
    pub ts_type_lit: TsTypeLit,
    pub source_map: &'a SourceMap,
}
