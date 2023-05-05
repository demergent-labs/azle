use crate::{
    canister_method::{errors::MissingReturnTypeAnnotation, AnnotatedFnDecl},
    errors::{CompilerOutput, Location, Suggestion},
    traits::GetSourceFileInfo,
};

pub fn build_void_return_type_required_error_message(
    annotated_fn_decl: &AnnotatedFnDecl,
) -> CompilerOutput {
    let span = match &annotated_fn_decl.fn_decl.function.return_type {
        Some(return_type) => return_type.span,
        None => {
            panic!(
                "{}",
                MissingReturnTypeAnnotation::from_annotated_fn_decl(annotated_fn_decl).to_string()
            )
        }
    };
    let title = "return type required to be void on system canister methods".to_string();
    let origin = annotated_fn_decl.source_map.get_origin(span);
    let line_number = annotated_fn_decl.source_map.get_line_number(span);
    let source = annotated_fn_decl.source_map.get_source(span);
    let range = annotated_fn_decl.source_map.get_range(span);
    let location = Location {
        origin,
        line_number,
        source,
        range,
    };
    let annotation = "required here".to_string();

    let void_return_type = ": void".to_string();
    let suggestion = Some(Suggestion {
        title: "Change the return type to void. E.g.:".to_string(),
        source: annotated_fn_decl
            .source_map
            .generate_source_with_range_replaced(span, range, &void_return_type),
        range: (range.0, range.0 + void_return_type.len()),
        annotation: None,
        import_suggestion: None,
    });

    CompilerOutput {
        title,
        location,
        annotation,
        suggestion,
    }
}
