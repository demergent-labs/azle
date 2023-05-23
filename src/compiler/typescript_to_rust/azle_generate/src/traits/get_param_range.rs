use swc_common::SourceMap;

use crate::ts_ast::source_map::Range;

pub trait GetParamRange {
    fn get_destructure_range(&self, source_map: &SourceMap) -> Range;
}
