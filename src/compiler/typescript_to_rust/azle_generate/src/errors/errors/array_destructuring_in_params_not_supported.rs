use swc_common::SourceMap;
use swc_ecma_ast::{ArrayPat, TsFnParam, TsFnType};

use crate::{
    canister_method::AnnotatedFnDecl,
    errors::{CompilerOutput, Location, Suggestion, SuggestionModifications},
    traits::GetSourceFileInfo,
    ts_ast::SourceMapped,
};

use super::GetDestructureRange;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ArrayDestructuringInParamsNotSupported {
    location: Location,
    suggestion_modifications: SuggestionModifications,
}

impl ArrayDestructuringInParamsNotSupported {
    pub fn from_ts_fn_param(
        sm_ts_fn_param: &SourceMapped<TsFnParam>,
        array_pat: &ArrayPat,
    ) -> Self {
        Self::build(sm_ts_fn_param.source_map, array_pat)
    }

    pub fn from_annotated_fn_decl(
        annotated_fn_decl: &SourceMapped<AnnotatedFnDecl>,
        array_pat: &ArrayPat,
    ) -> Self {
        Self::build(annotated_fn_decl.source_map, array_pat)
    }

    pub fn from_ts_fn_type(sm_ts_fn_type: &SourceMapped<TsFnType>, array_pat: &ArrayPat) -> Self {
        Self::build(sm_ts_fn_type.source_map, array_pat)
    }

    fn build(source_map: &SourceMap, array_pat: &ArrayPat) -> Self {
        let destructure_range = array_pat.get_destructure_range(source_map);
        Self {
            location: create_location(destructure_range, source_map, array_pat),
            suggestion_modifications: create_suggestion_modification(
                destructure_range,
                source_map,
                array_pat,
            ),
        }
    }

    fn build_array_destructure_error_message(&self) -> CompilerOutput {
        CompilerOutput {
            title: "Array destructuring in parameters is unsupported at this time".to_string(),
            location: self.location.clone(),
            annotation: "Attempted to destructure here".to_string(),
            suggestion: Some(Suggestion {
                title: "Remove destructuring in favor of a concrete name".to_string(),
                source: self.suggestion_modifications.0.clone(),
                range: self.suggestion_modifications.1,
                annotation: None,
                import_suggestion: None,
            }),
        }
    }
}

impl std::error::Error for ArrayDestructuringInParamsNotSupported {}

impl From<ArrayDestructuringInParamsNotSupported> for crate::Error {
    fn from(error: ArrayDestructuringInParamsNotSupported) -> Self {
        Self::ArrayDestructuringInParamsNotSupported(error)
    }
}

impl std::fmt::Display for ArrayDestructuringInParamsNotSupported {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.build_array_destructure_error_message())
    }
}

fn create_suggestion_modification(
    range: (usize, usize),
    source_map: &SourceMap,
    array_pat: &ArrayPat,
) -> SuggestionModifications {
    let replacement_name = "myParam"; // TODO: Come up with a better name from the ts_type_ann
    let source =
        source_map.generate_source_with_range_replaced(array_pat.span, range, replacement_name);
    let range = (range.0, range.0 + replacement_name.len());
    (source, range)
}

fn create_location(
    range: (usize, usize),
    source_map: &SourceMap,
    array_pat: &ArrayPat,
) -> Location {
    Location {
        origin: source_map.get_origin(array_pat.span),
        line_number: source_map.get_line_number(array_pat.span),
        source: source_map.get_source(array_pat.span),
        range,
    }
}
