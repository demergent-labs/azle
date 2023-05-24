use swc_common::Span;
use swc_ecma_ast::TsTypeRef;

use crate::{
    canister_method::AnnotatedFnDecl,
    errors::{CompilerOutput, Location, Suggestion},
    traits::GetSourceFileInfo,
};

#[derive(Debug, Clone, PartialEq)]
pub struct MissingReturnType {
    compiler_output: CompilerOutput,
}

impl MissingReturnType {
    pub fn from_annotated_fn_decl(
        annotated_fn_decl: &AnnotatedFnDecl,
        ts_type_ref: &TsTypeRef,
        canister_method_type: &str,
    ) -> Self {
        Self {
            compiler_output: annotated_fn_decl
                .build_missing_return_type_error_msg(ts_type_ref.span, canister_method_type),
        }
    }
}

impl std::error::Error for MissingReturnType {}

impl From<MissingReturnType> for crate::Error {
    fn from(error: MissingReturnType) -> Self {
        Self::MissingReturnType(error)
    }
}

impl std::fmt::Display for MissingReturnType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.compiler_output)
    }
}

impl AnnotatedFnDecl<'_> {
    fn build_missing_return_type_error_msg(
        &self,
        span: Span,
        canister_method_type: &str,
    ) -> CompilerOutput {
        let range = self.source_map.get_range(span);
        let example_type_param = "<null>".to_string();
        let example_return_type = format!("{}{}", canister_method_type, example_type_param);

        CompilerOutput {
            title: "Missing return type".to_string(),
            location: Location {
                origin: self.source_map.get_origin(span),
                line_number: self.source_map.get_line_number(span),
                source: format!("{} ", self.source_map.get_source(span)),
                range: (range.1, range.1 + 1),
            },
            annotation: "Expected return type here".to_string(),
            suggestion: Some(Suggestion {
                title: format!(
                    "Specify a return type as a type argument to `{}`. E.g.:",
                    canister_method_type
                ),
                source: self
                    .source_map
                    .generate_modified_source(span, &example_return_type),
                range: (range.1, range.1 + example_type_param.len()),
                annotation: None,
                import_suggestion: None,
            }),
        }
    }
}
