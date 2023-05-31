use swc_ecma_ast::{TsQualifiedName, TsTypeRef};

use crate::{
    errors::{CompilerOutput, Location, Suggestion, SuggestionModifications},
    traits::{GetName, GetSourceFileInfo, GetSourceInfo},
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct QualifiedName {
    location: Location,
    suggestion_modifications: SuggestionModifications,
}

impl QualifiedName {
    pub fn from_ts_type_ref(
        sm_ts_type_ref: &SourceMapped<TsTypeRef>,
        ts_qualified_name: &TsQualifiedName,
    ) -> Self {
        let unqualified_name = ts_qualified_name.right.get_name().to_string();
        let source = sm_ts_type_ref
            .source_map
            .generate_modified_source(sm_ts_type_ref.span, &unqualified_name);
        let range = sm_ts_type_ref
            .source_map
            .generate_modified_range(sm_ts_type_ref.span, &unqualified_name);
        Self {
            location: sm_ts_type_ref.get_location(),
            suggestion_modifications: (source, range),
        }
    }

    fn qualified_name_error(&self) -> CompilerOutput {
        CompilerOutput {
            title: "Namespace-qualified types are not currently supported".to_string(),
            location: self.location.clone(),
            annotation: "qualified name here".to_string(),
            suggestion: Some(Suggestion {
                title: "Either declare the type locally or import it without a wildcard"
                    .to_string(),
                annotation: Some("Use type directly here".to_string()),
                import_suggestion: None,
                source: self.suggestion_modifications.0.clone(),
                range: self.suggestion_modifications.1,
            }),
        }
    }
}

impl std::error::Error for QualifiedName {}

impl From<QualifiedName> for crate::Error {
    fn from(error: QualifiedName) -> Self {
        Self::QualifiedName(error)
    }
}

impl std::fmt::Display for QualifiedName {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.qualified_name_error())
    }
}
