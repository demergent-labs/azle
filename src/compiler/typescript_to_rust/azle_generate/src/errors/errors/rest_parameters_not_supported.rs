use swc_common::SourceMap;
use swc_ecma_ast::{RestPat, TsFnParam, TsFnType};

use crate::{
    canister_method::AnnotatedFnDecl,
    errors::{CompilerOutput, Location, Suggestion, SuggestionModifications},
    traits::GetSourceFileInfo,
    ts_ast::SourceMapped,
};

use super::GetDestructureRange;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct RestParametersNotSupported {
    message: String,
    location: Location,
    suggestion_modifications: SuggestionModifications,
}

impl RestParametersNotSupported {
    pub fn from_ts_fn_param(sm_ts_fn_param: &SourceMapped<TsFnParam>, rest_pat: &RestPat) -> Self {
        Self::build(
            "Rest parameters are not supported at this time",
            sm_ts_fn_param.source_map,
            rest_pat,
        )
    }

    pub fn from_annotated_fn_decl(
        annotated_fn_decl: &SourceMapped<AnnotatedFnDecl>,
        rest_pat: &RestPat,
    ) -> Self {
        Self::build(
            "Rest parameters are not supported in canister method signatures",
            annotated_fn_decl.source_map,
            rest_pat,
        )
    }

    pub fn from_ts_fn_type(sm_ts_fn_type: &SourceMapped<TsFnType>, rest_pat: &RestPat) -> Self {
        Self::build(
            "Rest parameters are not supported at this time",
            sm_ts_fn_type.source_map,
            rest_pat,
        )
    }

    fn build(message: &str, source_map: &SourceMap, rest_pat: &RestPat) -> Self {
        let destructure_range = rest_pat.get_destructure_range(source_map);
        Self {
            message: message.to_string(),
            location: create_location(destructure_range, source_map, rest_pat),
            suggestion_modifications: create_suggestion_modification(
                destructure_range,
                source_map,
                rest_pat,
            ),
        }
    }

    fn build_rest_param_error_msg(&self) -> CompilerOutput {
        CompilerOutput {
            title: self.message.clone(),
            location: self.location.clone(),
            annotation: "Attempted parameter spread here".to_string(),
            suggestion: Some(Suggestion {
                title: "Specify each parameter individually with a concrete type".to_string(),
                annotation: None,
                import_suggestion: None,
                source: self.suggestion_modifications.0.clone(),
                range: self.suggestion_modifications.1,
            }),
        }
    }
}

impl std::error::Error for RestParametersNotSupported {}

impl From<RestParametersNotSupported> for crate::Error {
    fn from(error: RestParametersNotSupported) -> Self {
        Self::RestParametersNotSupported(error)
    }
}

impl std::fmt::Display for RestParametersNotSupported {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.build_rest_param_error_msg())
    }
}

fn create_suggestion_modification(
    range: (usize, usize),
    source_map: &SourceMap,
    rest_pat: &RestPat,
) -> SuggestionModifications {
    let replacement_name = "myParam"; // TODO: Come up with a better name from the ts_type_ann
    let source =
        source_map.generate_source_with_range_replaced(rest_pat.span, range, replacement_name);
    let range = (range.0, range.0 + replacement_name.len());
    (source, range)
}

fn create_location(range: (usize, usize), source_map: &SourceMap, rest_pat: &RestPat) -> Location {
    Location {
        origin: source_map.get_origin(rest_pat.span),
        line_number: source_map.get_line_number(rest_pat.span),
        source: source_map.get_source(rest_pat.span),
        range,
    }
}
