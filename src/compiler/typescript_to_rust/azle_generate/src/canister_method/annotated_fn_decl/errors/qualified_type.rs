use swc_common::Span;
use swc_ecma_ast::TsTypeRef;

use crate::{
    canister_method::AnnotatedFnDecl,
    errors::{CompilerOutput, Location},
    traits::GetSourceFileInfo,
};

#[derive(Debug, Clone, PartialEq)]
pub struct QualifiedType {
    compiler_output: CompilerOutput,
}

impl QualifiedType {
    pub fn from_annotated_fn_decl(
        annotated_fn_decl: &AnnotatedFnDecl,
        ts_type_ref: &TsTypeRef,
    ) -> Self {
        Self {
            compiler_output: annotated_fn_decl.build_qualified_type_error_msg(ts_type_ref.span),
        }
    }
}

impl From<QualifiedType> for crate::Error {
    fn from(error: QualifiedType) -> Self {
        Self::QualifiedType(error)
    }
}

impl std::fmt::Display for QualifiedType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.compiler_output)
    }
}

impl AnnotatedFnDecl<'_> {
    fn build_qualified_type_error_msg(&self, span: Span) -> CompilerOutput {
        CompilerOutput {
            title: "Namespace-qualified types are not currently supported".to_string(),
            location: Location {
                origin: self.source_map.get_origin(span),
                line_number: self.source_map.get_line_number(span),
                source: self.source_map.get_source(span),
                range: self.source_map.get_range(span),
            },
            annotation: "Namespace specified here".to_string(),
            suggestion: None, // This is caught first by src/compiler/typescript_to_rust/azle_generate/src/ts_ast/azle_type/azle_type_ref/errors.rs
        }
    }
}
