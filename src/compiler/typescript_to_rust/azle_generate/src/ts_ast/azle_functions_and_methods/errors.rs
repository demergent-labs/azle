use swc_common::SourceMap;
use swc_ecma_ast::TsFnParam;

use crate::{
    errors::ErrorMessage,
    ts_ast::{
        ast_traits::{GetSpan, TypeToString},
        source_map::GetSourceFileInfo,
    },
};

// TODO Dan has all of the specifics for these errors in the fn_decl
pub(super) fn unsupported_type_error(
    ts_fn_param: TsFnParam,
    source_map: &SourceMap,
) -> ErrorMessage {
    ErrorMessage {
        title: "Type is not supported by azle".to_string(),
        origin: source_map.get_origin(ts_fn_param.get_span()),
        line_number: source_map.get_line_number(ts_fn_param.get_span()),
        source: source_map.get_source(ts_fn_param.get_span()),
        range: source_map.get_range(ts_fn_param.get_span()),
        annotation: format!("{} type is not supported", ts_fn_param.type_to_string()),
        suggestion: None,
    }
}
