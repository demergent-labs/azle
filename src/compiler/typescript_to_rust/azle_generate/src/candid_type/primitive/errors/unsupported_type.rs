use swc_ecma_ast::{TsKeywordType, TsKeywordTypeKind};

use crate::{
    errors::{CompilerOutput, InternalError, Suggestion},
    internal_error,
    traits::{GetSourceFileInfo, GetSourceInfo, GetSourceText},
    ts_ast::SourceMapped,
    Error,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct UnsupportedType {
    message: String,
}

impl UnsupportedType {
    pub fn from_ts_keyword_type(sm_keyword_type: &SourceMapped<TsKeywordType>) -> Self {
        let message = match &sm_keyword_type.kind {
            TsKeywordTypeKind::TsBigIntKeyword => sm_keyword_type.bigint_not_supported_error(),
            TsKeywordTypeKind::TsObjectKeyword => sm_keyword_type.keyword_not_supported_error(),
            TsKeywordTypeKind::TsNeverKeyword => sm_keyword_type.keyword_not_supported_error(),
            TsKeywordTypeKind::TsSymbolKeyword => sm_keyword_type.keyword_not_supported_error(),
            TsKeywordTypeKind::TsIntrinsicKeyword => sm_keyword_type.keyword_not_supported_error(),
            TsKeywordTypeKind::TsUndefinedKeyword => sm_keyword_type.keyword_not_supported_error(),
            TsKeywordTypeKind::TsUnknownKeyword => sm_keyword_type.keyword_not_supported_error(),
            TsKeywordTypeKind::TsAnyKeyword => sm_keyword_type.keyword_not_supported_error(),
            _ => Error::InternalError(InternalError {}), // TODO this is instead of the internal_error_macro
        }
        .to_string();
        Self { message }
    }
}

impl From<UnsupportedType> for crate::Error {
    fn from(error: UnsupportedType) -> Self {
        Self::UnsupportedType(error)
    }
}

impl std::fmt::Display for UnsupportedType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl SourceMapped<'_, TsKeywordType> {
    pub(super) fn _unsupported_type_error(&self) -> Result<(), Error> {
        Err(match &self.kind {
            TsKeywordTypeKind::TsBigIntKeyword => self.bigint_not_supported_error(),
            TsKeywordTypeKind::TsObjectKeyword => self.keyword_not_supported_error(),
            TsKeywordTypeKind::TsNeverKeyword => self.keyword_not_supported_error(),
            TsKeywordTypeKind::TsSymbolKeyword => self.keyword_not_supported_error(),
            TsKeywordTypeKind::TsIntrinsicKeyword => self.keyword_not_supported_error(),
            TsKeywordTypeKind::TsUndefinedKeyword => self.keyword_not_supported_error(),
            TsKeywordTypeKind::TsUnknownKeyword => self.keyword_not_supported_error(),
            TsKeywordTypeKind::TsAnyKeyword => self.keyword_not_supported_error(),
            //TODO Unreachable: {} is supported", self.get_source_text()
            _ => internal_error!(),
        })
    }

    fn bigint_not_supported_error(&self) -> Error {
        let replacement = "int".to_string();
        let suggestion = Some(Suggestion {
            title: "`int` will cover most everything that `bigint` does. For more number type options see: https://internetcomputer.org/docs/current/references/candid-ref/#type-nat".to_string(),
            range: self.source_map.generate_modified_range(self.span, &replacement),
            source: self.source_map.generate_modified_source(self.span, &replacement),
            annotation: Some("Try using `int` here.".to_string()),
            import_suggestion: Some("import { int } from 'azle';".to_string()),
        });
        Error::NewError(
            CompilerOutput {
                title: "Unsupported Type".to_string(),
                location: self.get_location(),
                annotation: "bigint is not a supported type".to_string(),
                suggestion,
            }
            .to_string(),
        )
    }

    fn keyword_not_supported_error(&self) -> Error {
        Error::NewError(
            CompilerOutput {
                title: "Unsupported Type".to_string(),
                location: self.get_location(),
                annotation: format!("{} is not a supported type", self.get_source_text()),
                suggestion: None,
            }
            .to_string(),
        )
    }
}
