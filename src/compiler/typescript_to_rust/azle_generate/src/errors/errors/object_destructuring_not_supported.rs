use swc_common::SourceMap;
use swc_ecma_ast::{ObjectPat, TsFnParam, TsFnType};

use crate::{
    canister_method::AnnotatedFnDecl,
    errors::{CompilerOutput, Location, Suggestion, SuggestionModifications},
    traits::GetSourceFileInfo,
    ts_ast::SourceMapped,
};

use super::GetDestructureRange;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ObjectDestructuringNotSupported {
    location: Location,
    suggestion_modifications: SuggestionModifications,
}

impl ObjectDestructuringNotSupported {
    pub fn from_ts_fn_param(
        sm_ts_fn_param: &SourceMapped<TsFnParam>,
        object_pat: &ObjectPat,
    ) -> Self {
        Self::build(sm_ts_fn_param.source_map, object_pat)
    }

    pub fn from_annotated_fn_decl(
        annotated_fn_decl: &SourceMapped<AnnotatedFnDecl>,
        object_pat: &ObjectPat,
    ) -> Self {
        Self::build(annotated_fn_decl.source_map, object_pat)
    }

    pub fn from_ts_fn_type(sm_ts_fn_type: &SourceMapped<TsFnType>, object_pat: &ObjectPat) -> Self {
        Self::build(sm_ts_fn_type.source_map, object_pat)
    }

    fn build(source_map: &SourceMap, object_pat: &ObjectPat) -> Self {
        let destructure_range = object_pat.get_destructure_range(source_map);
        Self {
            location: create_location(destructure_range, source_map, object_pat),
            suggestion_modifications: create_suggestion_modification(
                destructure_range,
                source_map,
                object_pat,
            ),
        }
    }

    fn build_object_destructure_error_msg(&self) -> CompilerOutput {
        CompilerOutput {
            title: "Object destructuring in parameters is unsupported at this time".to_string(),
            location: self.location.clone(),
            annotation: "Attempted to destructure here".to_string(),
            suggestion: Some(Suggestion {
                title: "Remove destructuring in favor of a concrete name".to_string(),
                annotation: None,
                import_suggestion: None,
                source: self.suggestion_modifications.0.clone(),
                range: self.suggestion_modifications.1.clone(),
            }),
        }
    }
}

impl std::error::Error for ObjectDestructuringNotSupported {}

impl From<ObjectDestructuringNotSupported> for crate::Error {
    fn from(error: ObjectDestructuringNotSupported) -> Self {
        Self::ObjectDestructuringNotSupported(error)
    }
}

impl std::fmt::Display for ObjectDestructuringNotSupported {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.build_object_destructure_error_msg())
    }
}

fn create_suggestion_modification(
    range: (usize, usize),
    source_map: &SourceMap,
    object_pat: &ObjectPat,
) -> SuggestionModifications {
    let replacement_name = "myParam"; // TODO: Come up with a better name from the ts_type_ann
    let source =
        source_map.generate_source_with_range_replaced(object_pat.span, range, replacement_name);
    let range = (range.0, range.0 + replacement_name.len());
    (source, range)
}

fn create_location(
    range: (usize, usize),
    source_map: &SourceMap,
    object_pat: &ObjectPat,
) -> Location {
    Location {
        origin: source_map.get_origin(object_pat.span),
        line_number: source_map.get_line_number(object_pat.span),
        source: source_map.get_source(object_pat.span),
        range,
    }
}
