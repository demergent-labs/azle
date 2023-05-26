use swc_ecma_ast::{TsQualifiedName, TsTypeRef};

use crate::{
    errors::{CompilerOutput, Suggestion},
    traits::{GetName, GetSourceFileInfo, GetSourceInfo},
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct QualifiedName {
    compiler_output: CompilerOutput,
}

impl QualifiedName {
    pub fn from_ts_type_ref(
        sm_ts_type_ref: &SourceMapped<TsTypeRef>,
        ts_qualified_name: &TsQualifiedName,
    ) -> Self {
        Self {
            compiler_output: sm_ts_type_ref
                .qualified_name_error(ts_qualified_name.right.get_name().to_string()),
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
        write!(f, "{}", self.compiler_output)
    }
}

impl SourceMapped<'_, TsTypeRef> {
    fn qualified_name_error(&self, unqualified_name: String) -> CompilerOutput {
        CompilerOutput {
            title: "Namespace-qualified types are not currently supported".to_string(),
            location: self.get_location(),
            annotation: "qualified name here".to_string(),
            suggestion: Some(Suggestion {
                title: "Either declare the type locally or import it without a wildcard"
                    .to_string(),
                source: self
                    .source_map
                    .generate_modified_source(self.span, &unqualified_name),
                range: self
                    .source_map
                    .generate_modified_range(self.span, &unqualified_name),
                annotation: Some("Use type directly here".to_string()),
                import_suggestion: None,
            }),
        }
    }
}
