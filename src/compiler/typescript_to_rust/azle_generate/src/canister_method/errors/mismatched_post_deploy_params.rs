use annotate_snippets::{
    display_list::{DisplayList, FormatOptions},
    snippet::{Annotation, AnnotationType, Slice, Snippet, SourceAnnotation},
};
use swc_common::source_map::Pos;

use crate::{canister_method::AnnotatedFnDecl, traits::GetSourceFileInfo, ts_ast::SourceMapped};

/// Returned when Azle detects a difference between the params in $init and $postUpgrade
///
/// # Example
///
/// ```ts
/// import { $init, $postUpgrade, int32 } from 'azle';
///
/// $init;
/// export function init(p1: boolean, p2: string, p3: int32): void {
///     console.log('Initialization complete.');
/// }
///
/// $postUpgrade;
/// export function postUpgrade(p1: int32, p2: boolean): void {
///     console.log('PostUpgrade complete.');
/// }
/// ```
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MismatchedPostDeployParams {
    pub origin: String,
    pub line_number: usize,
    pub source: String,
    pub ranges: Vec<(usize, usize)>,
}

impl MismatchedPostDeployParams {
    pub fn from_annotated_fn_decls(
        init_fn_decl: &SourceMapped<AnnotatedFnDecl>,
        post_upgrade_fn_decl: &SourceMapped<AnnotatedFnDecl>,
    ) -> Self {
        // TODO: Might this be a problem if the fn_decls come from different
        // typescript files?
        let source_map = init_fn_decl.source_map;

        let init_span = init_fn_decl.fn_decl.function.span;
        let post_upgrade_span = post_upgrade_fn_decl.fn_decl.function.span;

        // TODO: What if post_upgrade is before init?
        // Consider checking for the bigger/smaller of the two
        let total_range = (init_span.lo, post_upgrade_span.hi);

        let source = source_map.get_source_from_range(total_range);

        let first_occurrence = init_span;
        let line_number = source_map.get_line_number(first_occurrence);
        let origin = source_map.get_origin(first_occurrence);
        let offset = total_range.0.to_usize() - source_map.get_range(first_occurrence).0;

        let ranges = vec![
            source_map.get_multi_line_range(&init_span, offset),
            source_map.get_multi_line_range(&post_upgrade_span, offset),
        ];

        Self {
            origin,
            line_number,
            source,
            ranges,
        }
    }

    pub fn to_string(&self) -> String {
        let error_snippet = Snippet {
            title: Some(Annotation {
                label: Some("params for $init and $postUpgrade must be exactly the same"),
                id: None,
                annotation_type: AnnotationType::Error,
            }),
            slices: vec![Slice {
                source: &self.source,
                line_start: self.line_number,
                origin: Some(&self.origin),
                fold: true,
                annotations: vec![
                    SourceAnnotation {
                        label: "these params",
                        annotation_type: AnnotationType::Error,
                        range: self.ranges[0],
                    },
                    SourceAnnotation {
                        label: "and these params do not match",
                        annotation_type: AnnotationType::Error,
                        range: self.ranges[1],
                    },
                ],
            }],
            footer: vec![Annotation {
                label: Some(
                    "update the params for either $init or $postUpgrade to match the other",
                ),
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

impl std::error::Error for MismatchedPostDeployParams {}

impl std::fmt::Display for MismatchedPostDeployParams {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl From<MismatchedPostDeployParams> for crate::Error {
    fn from(error: MismatchedPostDeployParams) -> Self {
        Self::MismatchedPostDeployParams(error)
    }
}
