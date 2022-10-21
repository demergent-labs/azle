use swc_common::SourceMap;
use swc_ecma_ast::TsType;

use crate::{
    errors::ErrorMessage,
    ts_ast::{
        ast_traits::{GetSpan, TypeToString},
        source_map::GetSourceFileInfo,
    },
};

// TODO we probably should specify that they can use these types in their code
// wherever just so long as they aren't in any or their exported types or
// functions
pub(super) fn unsupported_type_error(ts_type: TsType, source_map: &SourceMap) -> ErrorMessage {
    ErrorMessage {
        title: "Type not supported by azle".to_string(),
        origin: source_map.get_origin(ts_type.get_span()),
        line_number: source_map.get_line_number(ts_type.get_span()),
        source: source_map.get_source(ts_type.get_span()),
        range: source_map.get_range(ts_type.get_span()),
        annotation: format!("{} type is not supported", ts_type.type_to_string()),
        suggestion: None,
    }
}
