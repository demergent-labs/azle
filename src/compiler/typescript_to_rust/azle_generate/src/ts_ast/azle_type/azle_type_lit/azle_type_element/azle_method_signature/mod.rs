mod errors;
mod function_and_method_helpers;
mod get_dependencies;
mod get_source_info;

use swc_common::SourceMap;
use swc_ecma_ast::TsMethodSignature;

pub struct AzleMethodSignature<'a> {
    pub ts_method_signature: TsMethodSignature,
    pub source_map: &'a SourceMap,
}
