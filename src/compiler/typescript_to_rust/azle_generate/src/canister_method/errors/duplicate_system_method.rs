use annotate_snippets::{
    display_list::{DisplayList, FormatOptions},
    snippet::{Annotation, AnnotationType, Slice, Snippet, SourceAnnotation},
};
use cdk_framework::act::node::canister_method::CanisterMethodType;
use swc_common::{source_map::Pos, Span};

use crate::{canister_method::AnnotatedFnDecl, traits::GetSourceFileInfo, ts_ast::SourceMapped};

/// Returned when Azle detects multiple system canister method annotations
/// of the same type.
///
/// # Example
///
/// ```ts
/// import { $init } from 'azle';
///
/// $init;
/// export function firstOccurrence(): void {
///     console.log("First init method")
/// }
///
/// $init;
/// export function secondOccurrence(): void {
///     console.log("Invalid second init method")
/// }
/// ```
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct DuplicateSystemMethod {
    pub canister_method_type: CanisterMethodType,
    pub origin: String,
    pub line_number: usize,
    pub source: String,
    pub ranges: Vec<(usize, usize)>,
}

impl DuplicateSystemMethod {
    pub fn from_annotated_fn_decls(
        annotated_fn_decls: &Vec<&SourceMapped<AnnotatedFnDecl>>,
        canister_method_type: CanisterMethodType,
    ) -> Self {
        // TODO: Might this be a problem if the fn_decls come from different
        // typescript files?
        let source_map = annotated_fn_decls[0].source_map;

        // TODO: Grab the span of the annotation
        let canister_method_spans: Vec<Span> = annotated_fn_decls
            .iter()
            .map(|annotated_fn_decl| annotated_fn_decl.fn_decl.function.span)
            .collect();

        let total_range = (
            canister_method_spans[0].lo,
            canister_method_spans[canister_method_spans.len() - 1].hi,
        );
        let source = source_map.get_source_from_range(total_range);

        let first_occurrence = canister_method_spans[0];
        let line_number = source_map.get_line_number(first_occurrence);
        let origin = source_map.get_origin(first_occurrence);
        let offset = total_range.0.to_usize() - source_map.get_range(first_occurrence).0;

        let ranges: Vec<_> = canister_method_spans
            .iter()
            .map(|span| source_map.get_multi_line_range(span, offset))
            .collect();

        Self {
            canister_method_type,
            origin,
            line_number,
            source,
            ranges,
        }
    }

    pub fn to_string(&self) -> String {
        let canister_method_type = match self.canister_method_type {
            CanisterMethodType::Heartbeat => "$heartbeat",
            CanisterMethodType::Init => "$init",
            CanisterMethodType::InspectMessage => "$inspectMessage",
            CanisterMethodType::PostUpgrade => "$postUpgrade",
            CanisterMethodType::PreUpgrade => "$preUpgrade",
            CanisterMethodType::Query => "$query",
            CanisterMethodType::Update => "$update",
        };

        let error_message = format!(
            "duplicate {} canister method implementation",
            canister_method_type
        );

        let annotations: Vec<SourceAnnotation> = self
            .ranges
            .iter()
            .enumerate()
            .map(|(i, range)| SourceAnnotation {
                label: if i == 0 {
                    "first specified here"
                } else {
                    "and later specified here"
                },
                annotation_type: AnnotationType::Error,
                range: *range,
            })
            .collect();

        let suggestion = format!("remove all but one {} method", canister_method_type);

        let error_snippet = Snippet {
            title: Some(Annotation {
                label: Some(&error_message),
                id: None,
                annotation_type: AnnotationType::Error,
            }),
            slices: vec![Slice {
                source: &self.source,
                line_start: self.line_number,
                origin: Some(&self.origin),
                fold: true,
                annotations: annotations,
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
}

impl std::error::Error for DuplicateSystemMethod {}

impl std::fmt::Display for DuplicateSystemMethod {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl From<DuplicateSystemMethod> for crate::Error {
    fn from(error: DuplicateSystemMethod) -> Self {
        Self::DuplicateSystemMethodImplementation(error)
    }
}
