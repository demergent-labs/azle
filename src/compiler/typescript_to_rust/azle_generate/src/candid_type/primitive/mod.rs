use cdk_framework::act::node::candid::Primitive;
use swc_common::Span;
use swc_ecma_ast::{TsKeywordType, TsKeywordTypeKind};

use crate::{
    errors::{CompilerOutput, Suggestion},
    traits::{GetSourceFileInfo, GetSourceInfo, GetSourceText, GetSpan},
    ts_ast::SourceMapped,
    Error,
};

impl SourceMapped<'_, TsKeywordType> {
    pub fn to_primitive(&self) -> Result<Primitive, Vec<Error>> {
        Ok(match self.kind {
            TsKeywordTypeKind::TsBooleanKeyword => Primitive::Bool,
            TsKeywordTypeKind::TsStringKeyword => Primitive::String,
            TsKeywordTypeKind::TsVoidKeyword => Primitive::Void,
            TsKeywordTypeKind::TsNullKeyword => Primitive::Null,
            TsKeywordTypeKind::TsNumberKeyword => Primitive::Float64,
            _ => panic!("{}", self.unsupported_type_error()),
        })
    }

    pub(super) fn unsupported_type_error(&self) -> CompilerOutput {
        match &self.kind {
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

    fn bigint_not_supported_error(&self) -> CompilerOutput {
        let replacement = "int".to_string();
        let suggestion = Some(Suggestion {
            title: "`int` will cover most everything that `bigint` does. For more number type options see: https://internetcomputer.org/docs/current/references/candid-ref/#type-nat".to_string(),
            range: self.source_map.generate_modified_range(self.span, &replacement),
            source: self.source_map.generate_modified_source(self.span, &replacement),
            annotation: Some("Try using `int` here.".to_string()),
            import_suggestion: Some("import { int } from 'azle';".to_string()),
        });
        CompilerOutput {
            title: "Unsupported Type".to_string(),
            location: self.get_location(),
            annotation: "bigint is not a supported type".to_string(),
            suggestion,
        }
    }

    fn keyword_not_supported_error(&self) -> CompilerOutput {
        CompilerOutput {
            title: "Unsupported Type".to_string(),
            location: self.get_location(),
            annotation: format!("{} is not a supported type", self.get_source_text()),
            suggestion: None,
        }
    }
}

impl GetSpan for TsKeywordType {
    fn get_span(&self) -> Span {
        self.span
    }
}
