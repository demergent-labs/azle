use swc_common::SourceMap;

use crate::ts_ast::source_map::Range;

pub trait GetDestructureRange {
    fn get_destructure_range(&self, source_map: &SourceMap) -> Range;
}
