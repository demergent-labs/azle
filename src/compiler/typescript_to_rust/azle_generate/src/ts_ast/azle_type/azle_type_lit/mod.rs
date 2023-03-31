use swc_common::SourceMap;
use swc_ecma_ast::TsTypeLit;

pub use azle_type_element::AzleTypeElement;

mod get_source_text;

pub mod azle_type_element;
pub mod get_source_info;

#[derive(Clone)]
pub struct AzleTypeLit<'a> {
    pub ts_type_lit: TsTypeLit,
    pub source_map: &'a SourceMap,
}
