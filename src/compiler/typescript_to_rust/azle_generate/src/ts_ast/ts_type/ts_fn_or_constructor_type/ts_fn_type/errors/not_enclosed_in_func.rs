use swc_ecma_ast::TsFnType;

use crate::{
    errors::{CompilerOutput, Location, Suggestion, SuggestionModifications},
    traits::{GetSourceFileInfo, GetSourceInfo, GetSourceText},
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct NotEnclosedInFunc {
    location: Location,
    suggestion_modifications: SuggestionModifications,
}

impl NotEnclosedInFunc {
    pub fn from_ts_fn_type(sm_ts_fn_type: &SourceMapped<TsFnType>) -> Self {
        let replacement_code = format!("Func<{}>", sm_ts_fn_type.get_source_text());
        let modified_source = sm_ts_fn_type
            .source_map
            .generate_modified_source(sm_ts_fn_type.span, &replacement_code);
        let modified_range = sm_ts_fn_type
            .source_map
            .generate_modified_range(sm_ts_fn_type.span, &replacement_code);
        Self {
            location: sm_ts_fn_type.get_location(),
            suggestion_modifications: (modified_source, modified_range),
        }
    }

    fn not_enclosed_in_func_error(&self) -> CompilerOutput {
        let suggestion = Suggestion {
            title:
                "Any function that will end up as part of the candid needs to be enclosed in Func<>"
                    .to_string(),
            source: self.suggestion_modifications.0.clone(),
            range: self.suggestion_modifications.1,
            annotation: Some("Enclose in Func<> here.".to_string()),
            import_suggestion: None,
        };
        CompilerOutput {
            title: "Invalid Func".to_string(),
            location: self.location.clone(),
            annotation: "Function must be enclosed in Func<>".to_string(),
            suggestion: Some(suggestion),
        }
    }
}

impl std::error::Error for NotEnclosedInFunc {}

impl From<NotEnclosedInFunc> for crate::Error {
    fn from(error: NotEnclosedInFunc) -> Self {
        Self::NotEnclosedInFunc(error)
    }
}

impl std::fmt::Display for NotEnclosedInFunc {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.not_enclosed_in_func_error())
    }
}

impl SourceMapped<'_, TsFnType> {}
