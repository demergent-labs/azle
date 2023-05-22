use swc_ecma_ast::{TsKeywordType, TsKeywordTypeKind};

use crate::{
    errors::{CompilerOutput, Suggestion},
    internal_error,
    traits::{GetSourceFileInfo, GetSourceInfo, GetSourceText},
    ts_ast::SourceMapped,
    Error,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct UnsupportedType {}

impl UnsupportedType {
    pub fn from_ts_keyword_type(sm_ts_type_ref: &SourceMapped<TsKeywordType>) -> Self {
        Self {}
    }
}

impl From<UnsupportedType> for crate::Error {
    fn from(error: UnsupportedType) -> Self {
        Self::UnsupportedType(error)
    }
}

impl SourceMapped<'_, TsKeywordType> {
    pub(super) fn _unsupported_type_error(&self) -> Result<(), Error> {
        Err(match &self.kind {
            TsKeywordTypeKind::TsBigIntKeyword => self._bigint_not_supported_error(),
            TsKeywordTypeKind::TsObjectKeyword => self._keyword_not_supported_error(),
            TsKeywordTypeKind::TsNeverKeyword => self._keyword_not_supported_error(),
            TsKeywordTypeKind::TsSymbolKeyword => self._keyword_not_supported_error(),
            TsKeywordTypeKind::TsIntrinsicKeyword => self._keyword_not_supported_error(),
            TsKeywordTypeKind::TsUndefinedKeyword => self._keyword_not_supported_error(),
            TsKeywordTypeKind::TsUnknownKeyword => self._keyword_not_supported_error(),
            TsKeywordTypeKind::TsAnyKeyword => self._keyword_not_supported_error(),
            //TODO Unreachable: {} is supported", self.get_source_text()
            _ => internal_error!(),
        })
    }

    fn _bigint_not_supported_error(&self) -> Error {
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

    fn _keyword_not_supported_error(&self) -> Error {
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
