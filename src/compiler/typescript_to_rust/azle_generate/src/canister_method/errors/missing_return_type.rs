use swc_common::SourceMap;
use swc_ecma_ast::FnDecl;

use crate::{
    errors::{ErrorMessage, Suggestion},
    traits::GetSourceFileInfo,
};

pub fn build_missing_return_type_error_message(
    fn_decl: &FnDecl,
    source_map: &SourceMap,
) -> ErrorMessage {
    let span = fn_decl.function.span;

    // TODO: Not very robust.
    let range = match fn_decl.function.params.last() {
        Some(param) => {
            let last_param_span_end_pos = source_map.get_range(param.span).1 + 1;
            (last_param_span_end_pos, last_param_span_end_pos + 1)
        }
        None => {
            let ident_span_end_pos = source_map.get_range(fn_decl.ident.span).1;
            let parens_length = "()".to_string().len();

            (
                ident_span_end_pos + parens_length,
                ident_span_end_pos + parens_length + 1,
            )
        }
    };
    let source = source_map.get_source(span);

    let example_return_type = ": void".to_string();
    let adjusted_source = insert_return_type_into_source(&source, range.0, &example_return_type);

    ErrorMessage {
        title: format!("missing return type annotation"),
        origin: source_map.get_origin(span),
        line_number: source_map.get_line_number(span),
        source,
        range,
        annotation: "expected here".to_string(),
        suggestion: Some(Suggestion {
            title: "Add a valid candid type as a return type. E.g.:".to_string(),
            source: adjusted_source,
            range: (range.0, range.0 + example_return_type.len()),
            annotation: None,
            import_suggestion: None,
        }),
    }
}

fn insert_return_type_into_source(
    source: &String,
    index: usize,
    return_type_annotation: &String,
) -> String {
    format!(
        "{}{}{}",
        &source[..index],
        return_type_annotation,
        &source[index..]
    )
}
