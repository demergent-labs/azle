use swc_common::SourceMap;
use swc_ecma_ast::TsFnOrConstructorType;

use crate::{
    errors::ErrorMessage,
    traits::{GetSourceFileInfo, GetSpan},
};

pub(super) fn constructor_not_supported_error(
    ts_type: TsFnOrConstructorType,
    source_map: &SourceMap,
) -> ErrorMessage {
    ErrorMessage {
        title: "Constructor type is not supported by azle".to_string(),
        origin: source_map.get_origin(ts_type.get_span()),
        line_number: source_map.get_line_number(ts_type.get_span()),
        source: source_map.get_source(ts_type.get_span()),
        range: source_map.get_range(ts_type.get_span()),
        annotation: "constructor type is not supported".to_string(),
        suggestion: None,
    }
}

impl GetSpan for TsFnOrConstructorType {
    fn get_span(&self) -> swc_common::Span {
        match self {
            TsFnOrConstructorType::TsFnType(ts_fn_type) => ts_fn_type.span,
            TsFnOrConstructorType::TsConstructorType(ts_constructor_type) => {
                ts_constructor_type.span
            }
        }
    }
}
