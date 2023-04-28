use swc_common::SourceMap;
use swc_ecma_ast::FnDecl;

use crate::{
    canister_method,
    errors::{ErrorMessage, Suggestion},
    traits::GetSourceFileInfo,
};

pub fn build_void_return_type_required_error_message(
    fn_decl: &FnDecl,
    source_map: &SourceMap,
) -> ErrorMessage {
    let span = match &fn_decl.function.return_type {
        Some(return_type) => return_type.span,
        None => {
            panic!(
                "{}",
                canister_method::errors::build_missing_return_type_error_message(
                    &fn_decl, source_map
                )
            )
        }
    };
    let title = "return type required to be void on system canister methods".to_string();
    let origin = source_map.get_origin(span);
    let line_number = source_map.get_line_number(span);
    let source = source_map.get_source(span);
    let range = source_map.get_range(span);
    let annotation = "required here".to_string();

    let void_return_type = ": void".to_string();
    let suggestion = Some(Suggestion {
        title: "Change the return type to void. E.g.:".to_string(),
        source: source_map.generate_source_with_range_replaced(span, range, &void_return_type),
        range: (range.0, range.0 + void_return_type.len()),
        annotation: None,
        import_suggestion: None,
    });

    ErrorMessage {
        title,
        origin,
        line_number,
        source,
        range,
        annotation,
        suggestion,
    }
}
