use annotate_snippets::{
    display_list::{DisplayList, FormatOptions},
    snippet::{Annotation, AnnotationType, Slice, Snippet, SourceAnnotation},
};
use swc_common::{source_map::Pos, BytePos, Span};

use crate::{
    canister_method::AnnotatedFnDecl,
    traits::GetSourceFileInfo,
    ts_ast::{source_map::Range, SourceMapped},
};

pub type SmAnFnDecl<'a> = SourceMapped<'a, AnnotatedFnDecl>;

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
        init_fn_decl: &SmAnFnDecl,
        post_upgrade_fn_decl: &SmAnFnDecl,
    ) -> Self {
        // TODO: Might this be a problem if the fn_decls come from different
        // typescript files?
        let source_map = init_fn_decl.source_map;

        let ordered_fn_decls = order_fn_decls(init_fn_decl, post_upgrade_fn_decl);

        let total_range = get_total_range(ordered_fn_decls);
        let source = source_map.get_source_from_range(total_range);

        let first_span = get_first_span(ordered_fn_decls);

        let line_number = source_map.get_line_number(first_span);
        let origin = source_map.get_origin(first_span);
        let offset = total_range.0.to_usize() - source_map.get_range(first_span).0;

        let ranges = get_ranges(ordered_fn_decls, offset);

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

impl From<MismatchedPostDeployParams> for Vec<crate::Error> {
    fn from(error: MismatchedPostDeployParams) -> Self {
        vec![crate::Error::MismatchedPostDeployParams(error)]
    }
}

fn order_fn_decls<'a>(
    a: &'a SmAnFnDecl<'a>,
    b: &'a SmAnFnDecl<'a>,
) -> (&'a SmAnFnDecl<'a>, &'a SmAnFnDecl<'a>) {
    let a_start_byte_pos = get_start_byte_pos(a);
    let b_start_byte_pos = get_start_byte_pos(b);

    if a_start_byte_pos.lt(&b_start_byte_pos) {
        (a, b)
    } else {
        (b, a)
    }
}

fn get_start_byte_pos(sm_an_fn_decl: &SmAnFnDecl) -> BytePos {
    let params = &sm_an_fn_decl.fn_decl.function.params;

    if params.len() == 0 {
        return sm_an_fn_decl.fn_decl.ident.span.lo;
    }

    let first_param_span = params[0].span;

    first_param_span.lo
}

fn get_end_byte_pos(sm_an_fn_decl: &SmAnFnDecl) -> BytePos {
    let params = &sm_an_fn_decl.fn_decl.function.params;

    if params.len() == 0 {
        return sm_an_fn_decl.fn_decl.ident.span.hi;
    }

    let last_param_span = params[params.len() - 1].span;

    last_param_span.hi
}

fn get_total_range(ordered_fn_decls: (&SmAnFnDecl, &SmAnFnDecl)) -> (BytePos, BytePos) {
    let first_fn_decl = ordered_fn_decls.0;
    let last_fn_decl = ordered_fn_decls.1;

    let start_byte_pos = get_start_byte_pos(first_fn_decl);
    let end_byte_pos = get_end_byte_pos(last_fn_decl);

    (start_byte_pos, end_byte_pos)
}

fn get_first_span(ordered_fn_decls: (&SmAnFnDecl, &SmAnFnDecl)) -> Span {
    let first_fn_decl = ordered_fn_decls.0;

    let params = &first_fn_decl.fn_decl.function.params;

    if params.len() == 0 {
        return first_fn_decl.fn_decl.ident.span;
    }

    params[0].span
}

fn get_ranges(ordered_fn_decls: (&SmAnFnDecl, &SmAnFnDecl), offset: usize) -> Vec<Range> {
    let first_fn_decl = ordered_fn_decls.0;
    let last_fn_decl = ordered_fn_decls.1;

    vec![
        get_range(first_fn_decl, offset),
        get_range(last_fn_decl, offset),
    ]
}

fn get_range(sm_an_fn_decl: &SmAnFnDecl, offset: usize) -> Range {
    let params = &sm_an_fn_decl.fn_decl.function.params;

    let range: Range = if params.len() == 0 {
        let span = sm_an_fn_decl.fn_decl.ident.span;

        (span.lo.to_usize(), span.hi.to_usize())
    } else {
        let first_param_span = params[0].span;
        let last_param_span = params[params.len() - 1].span;

        (
            first_param_span.lo.to_usize(),
            last_param_span.hi.to_usize(),
        )
    };

    (range.0 - offset, range.1 - offset)
}
