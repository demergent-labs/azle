mod errors;
mod function_and_method_type_helper_methods;
mod get_dependencies;
mod get_source_info;
mod get_source_text;
mod to_act_data_type;

use swc_common::SourceMap;
use swc_ecma_ast::TsFnType;

#[derive(Clone)]
pub struct AzleFnType<'a> {
    pub ts_fn_type: TsFnType,
    pub source_map: &'a SourceMap,
}
