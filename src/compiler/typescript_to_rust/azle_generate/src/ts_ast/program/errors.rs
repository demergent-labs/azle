use annotate_snippets::{
    display_list::{DisplayList, FormatOptions},
    snippet::{Annotation, AnnotationType, Slice, Snippet, SourceAnnotation},
};
use swc_common::source_map::Pos;

use crate::ts_ast::{source_map::GetSourceFileInfo, AzleFnDecl};

pub fn create_duplicate_method_types_error_message(
    azle_fn_decls: Vec<AzleFnDecl>,
    method_type: &str,
) -> String {
    let source_map = azle_fn_decls[0].source_map;
    let first_occurrence = &azle_fn_decls[0];
    let second_occurrence = &azle_fn_decls[1];

    let return_type_span = first_occurrence
        .fn_decl
        .function
        .return_type
        .as_ref()
        .unwrap() // TODO
        .type_ann
        .as_ts_type_ref()
        .unwrap() // TODO
        .span;

    let second_return_type_span = second_occurrence
        .fn_decl
        .function
        .return_type
        .as_ref()
        .unwrap() // TODO
        .type_ann
        .as_ts_type_ref()
        .unwrap() // TODO
        .span;

    let total_range = (return_type_span.lo, second_return_type_span.hi);

    let source = source_map.get_source_from_range(total_range);

    let line_number = source_map.get_line_number(return_type_span);
    let line_range = source_map.get_range(return_type_span);
    let origin = source_map.get_origin(second_return_type_span);

    let char_diff = total_range.0.to_usize() - line_range.0;
    let range2 = source_map.get_multi_line_range(second_return_type_span, char_diff);

    let error_message = format!("cannot expose more than one {} method", method_type);
    let first_annotation_label = format!("{} first defined here", method_type);

    let error_snippet = Snippet {
        title: Some(Annotation {
            label: Some(&error_message),
            id: None,
            annotation_type: AnnotationType::Error,
        }),
        footer: vec![],
        slices: vec![
            Slice {
                source: &source,
                line_start: line_number,
                origin: Some(&origin),
                fold: true,
                annotations: vec![SourceAnnotation {
                    label: &first_annotation_label,
                    annotation_type: AnnotationType::Error,
                    range: line_range,
                }],
            },
            Slice {
                source: &source,
                line_start: line_number,
                origin: None,
                fold: true,
                annotations: vec![SourceAnnotation {
                    label: "and later defined here",
                    annotation_type: AnnotationType::Error,
                    range: range2,
                }],
            },
        ],
        opt: FormatOptions {
            color: true,
            ..Default::default()
        },
    };

    format!("{}", DisplayList::from(error_snippet))
}
