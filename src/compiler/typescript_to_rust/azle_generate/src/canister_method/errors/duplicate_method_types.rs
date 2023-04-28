use annotate_snippets::{
    display_list::{DisplayList, FormatOptions},
    snippet::{Annotation, AnnotationType, Slice, Snippet, SourceAnnotation},
};
use cdk_framework::act::node::canister_method::CanisterMethodType;
use swc_common::{source_map::Pos, Span};

use crate::{canister_method::AnnotatedFnDecl, traits::GetSourceFileInfo};

pub fn build_duplicate_method_types_error_message_from_annotated_fn_decl(
    annotated_fn_decls: Vec<AnnotatedFnDecl>,
    canister_method_type: CanisterMethodType,
) -> String {
    let source_map = annotated_fn_decls[0].source_map;

    let return_type_spans: Vec<Span> = annotated_fn_decls
        .iter()
        .map(|annotated_fn_decl| {
            annotated_fn_decl
                .fn_decl
                .function
                .return_type
                .as_ref()
                .expect("Canister methods must specify a return type")
                .type_ann
                .as_ts_type_ref()
                .expect("Canister methods must specify a return type")
                .span
        })
        .collect();

    let total_range = (
        return_type_spans[0].lo,
        return_type_spans[return_type_spans.len() - 1].hi,
    );
    let source = source_map.get_source_from_range(total_range);

    let first_occurrence = return_type_spans[0];
    let line_start = source_map.get_line_number(first_occurrence);
    let origin = source_map.get_origin(first_occurrence);
    let offset = total_range.0.to_usize() - source_map.get_range(first_occurrence).0;

    let annotations: Vec<SourceAnnotation> = return_type_spans
        .iter()
        .enumerate()
        .map(|(i, span)| SourceAnnotation {
            label: if i == 0 {
                "first specified here"
            } else {
                "and later specified here"
            },
            annotation_type: AnnotationType::Error,
            range: source_map.get_multi_line_range(span, offset),
        })
        .collect();

    let error_message = format!(
        "cannot expose more than one {} method",
        canister_method_type
    );
    let suggestion = format!("remove all but one {} method", canister_method_type);

    let error_snippet = Snippet {
        title: Some(Annotation {
            label: Some(&error_message),
            id: None,
            annotation_type: AnnotationType::Error,
        }),
        slices: vec![Slice {
            source: &source,
            line_start,
            origin: Some(&origin),
            fold: true,
            annotations,
        }],
        footer: vec![Annotation {
            label: Some(&suggestion),
            id: None,
            annotation_type: AnnotationType::Help,
        }],
        opt: FormatOptions {
            color: true,
            ..Default::default()
        },
    };

    format!("{}", DisplayList::from(error_snippet))
}

pub fn build_duplicate_method_types_error_message(
    annotated_fn_decls: Vec<AnnotatedFnDecl>,
    canister_method_type: CanisterMethodType,
) -> String {
    let source_map = annotated_fn_decls[0].source_map;

    let return_type_spans: Vec<Span> = annotated_fn_decls
        .iter()
        .map(|annotated_fn_decl| {
            annotated_fn_decl
                .fn_decl
                .function
                .return_type
                .as_ref()
                .expect("Canister methods must specify a return type")
                .type_ann
                .as_ts_type_ref()
                .expect("Canister methods must specify a return type")
                .span
        })
        .collect();

    let total_range = (
        return_type_spans[0].lo,
        return_type_spans[return_type_spans.len() - 1].hi,
    );
    let source = source_map.get_source_from_range(total_range);

    let first_occurrence = return_type_spans[0];
    let line_start = source_map.get_line_number(first_occurrence);
    let origin = source_map.get_origin(first_occurrence);
    let offset = total_range.0.to_usize() - source_map.get_range(first_occurrence).0;

    let annotations: Vec<SourceAnnotation> = return_type_spans
        .iter()
        .enumerate()
        .map(|(i, span)| SourceAnnotation {
            label: if i == 0 {
                "first specified here"
            } else {
                "and later specified here"
            },
            annotation_type: AnnotationType::Error,
            range: source_map.get_multi_line_range(span, offset),
        })
        .collect();

    let error_message = format!(
        "cannot expose more than one {} method",
        canister_method_type
    );
    let suggestion = format!("remove all but one {} method", canister_method_type);

    let error_snippet = Snippet {
        title: Some(Annotation {
            label: Some(&error_message),
            id: None,
            annotation_type: AnnotationType::Error,
        }),
        slices: vec![Slice {
            source: &source,
            line_start,
            origin: Some(&origin),
            fold: true,
            annotations,
        }],
        footer: vec![Annotation {
            label: Some(&suggestion),
            id: None,
            annotation_type: AnnotationType::Help,
        }],
        opt: FormatOptions {
            color: true,
            ..Default::default()
        },
    };

    format!("{}", DisplayList::from(error_snippet))
}
