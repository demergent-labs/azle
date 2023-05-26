use swc_ecma_ast::{TsKeywordType, TsKeywordTypeKind};

use crate::{
    errors::{CompilerOutput, InternalError, Suggestion},
    traits::{GetSourceFileInfo, GetSourceInfo, GetSourceText},
    ts_ast::SourceMapped,
    Error,
};

#[derive(Clone, Debug, PartialEq)]
pub struct UnsupportedType {
    compiler_output: CompilerOutput,
}

impl std::error::Error for UnsupportedType {}

impl UnsupportedType {
    pub fn error_from_ts_keyword_type(sm_keyword_type: &SourceMapped<TsKeywordType>) -> Error {
        let (suggestion, annotation) = match &sm_keyword_type.kind {
            TsKeywordTypeKind::TsBigIntKeyword => sm_keyword_type.create_bigint_error(),
            TsKeywordTypeKind::TsObjectKeyword => sm_keyword_type.create_not_supported_tuple(),
            TsKeywordTypeKind::TsNeverKeyword => sm_keyword_type.create_not_supported_tuple(),
            TsKeywordTypeKind::TsSymbolKeyword => sm_keyword_type.create_not_supported_tuple(),
            TsKeywordTypeKind::TsIntrinsicKeyword => sm_keyword_type.create_not_supported_tuple(),
            TsKeywordTypeKind::TsUndefinedKeyword => sm_keyword_type.create_not_supported_tuple(),
            TsKeywordTypeKind::TsUnknownKeyword => sm_keyword_type.create_not_supported_tuple(),
            TsKeywordTypeKind::TsAnyKeyword => sm_keyword_type.create_not_supported_tuple(),
            _ => return Error::InternalError(InternalError {}),
        };
        Self {
            compiler_output: CompilerOutput {
                title: "Unsupported Type".to_string(),
                annotation,
                suggestion,
                location: sm_keyword_type.get_location(),
            },
        }
        .into()
    }
}

impl From<UnsupportedType> for crate::Error {
    fn from(error: UnsupportedType) -> Self {
        Self::UnsupportedType(error)
    }
}

impl std::fmt::Display for UnsupportedType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.compiler_output)
    }
}

impl SourceMapped<'_, TsKeywordType> {
    fn create_bigint_error(&self) -> (Option<Suggestion>, String) {
        let replacement = "int".to_string();
        let suggestion = Some(Suggestion {
            title: "`int` will cover most everything that `bigint` does. For more number type options see: https://internetcomputer.org/docs/current/references/candid-ref/#type-nat".to_string(),
            range: self.source_map.generate_modified_range(self.span, &replacement),
            source: self.source_map.generate_modified_source(self.span, &replacement),
            annotation: Some("Try using `int` here.".to_string()),
            import_suggestion: Some("import { int } from 'azle';".to_string()),
        });

        (suggestion, "bigint is not a supported type".to_string())
    }

    fn create_not_supported_tuple(&self) -> (Option<Suggestion>, String) {
        (
            None,
            format!("{} is not a supported type", self.get_source_text()),
        )
    }
}
