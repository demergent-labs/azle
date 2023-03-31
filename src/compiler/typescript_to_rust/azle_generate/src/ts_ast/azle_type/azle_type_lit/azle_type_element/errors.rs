use swc_common::SourceMap;
use swc_ecma_ast::TsTypeElement;

use crate::{
    errors::ErrorMessage,
    ts_ast::{
        source_map::GetSourceFileInfo,
        traits::{GetSpan, TypeToString},
    },
};

pub(super) fn unsupported_type_error(
    ts_type_element: TsTypeElement,
    source_map: &SourceMap,
) -> ErrorMessage {
    ErrorMessage {
        title: "Type is not supported by azle".to_string(),
        origin: source_map.get_origin(ts_type_element.get_span()),
        line_number: source_map.get_line_number(ts_type_element.get_span()),
        source: source_map.get_source(ts_type_element.get_span()),
        range: source_map.get_range(ts_type_element.get_span()),
        annotation: format!("{} type is not supported", ts_type_element.type_to_string()),
        suggestion: None,
    }
}
