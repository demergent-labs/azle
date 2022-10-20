use swc_ecma_ast::TsKeywordTypeKind;

use super::AzleKeywordType;
use crate::{
    errors::{ErrorMessage, Suggestion},
    ts_ast::{ast_traits::GetSourceInfo, source_map::GetSourceFileInfo, GetSourceText},
};

impl AzleKeywordType<'_> {
    pub(super) fn unsupported_type_error(&self) -> ErrorMessage {
        match &self.ts_keyword_type.kind {
            TsKeywordTypeKind::TsNumberKeyword => self.number_not_supported_error(),
            TsKeywordTypeKind::TsBigIntKeyword => self.bigint_not_supported_error(),
            TsKeywordTypeKind::TsObjectKeyword => self.keyword_not_supported_error(),
            TsKeywordTypeKind::TsNeverKeyword => self.keyword_not_supported_error(),
            TsKeywordTypeKind::TsSymbolKeyword => self.keyword_not_supported_error(),
            TsKeywordTypeKind::TsIntrinsicKeyword => self.keyword_not_supported_error(),
            TsKeywordTypeKind::TsUndefinedKeyword => self.keyword_not_supported_error(),
            TsKeywordTypeKind::TsUnknownKeyword => self.keyword_not_supported_error(),
            TsKeywordTypeKind::TsAnyKeyword => self.keyword_not_supported_error(),
            _ => panic!("Unreachable: {} is supported", self.get_source_text()),
        }
    }

    fn bigint_not_supported_error(&self) -> ErrorMessage {
        let replacement = "int".to_string();
        let suggestion = Some(Suggestion {
            title: "`int` will cover most everything that `bigint` does. For more number type options see: https://internetcomputer.org/docs/current/references/candid-ref/#type-nat".to_string(),
            range: self.source_map.generate_modified_range(self.ts_keyword_type.span, &replacement),
            source: self.source_map.generate_modified_source(self.ts_keyword_type.span, &replacement),
            annotation: Some("Try using `int` here.".to_string()),
            import_suggestion: Some("import { int } from 'azle';".to_string()),
        });
        ErrorMessage {
            title: "Unsupported Type".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: "bigint is not a supported type".to_string(),
            suggestion,
        }
    }

    fn number_not_supported_error(&self) -> ErrorMessage {
        let replacement = "float64".to_string();
        let suggestion = Some(Suggestion {
            title: "`float64` will cover most everything that `number` does. For more number type options see: https://internetcomputer.org/docs/current/references/candid-ref/#type-nat".to_string(),
            range: self.source_map.generate_modified_range(self.ts_keyword_type.span, &replacement),
            source: self.source_map.generate_modified_source(self.ts_keyword_type.span, &replacement),
            annotation: Some("Try using `float64` here.".to_string()),
            import_suggestion: Some("import { float64 } from 'azle';".to_string()),
        });
        ErrorMessage {
            title: "Unsupported Type".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: "number is not a supported type".to_string(),
            suggestion,
        }
    }

    fn keyword_not_supported_error(&self) -> ErrorMessage {
        ErrorMessage {
            title: "Unsupported Type".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: format!("{} is not a supported type", self.get_source_text()),
            suggestion: None,
        }
    }
}
