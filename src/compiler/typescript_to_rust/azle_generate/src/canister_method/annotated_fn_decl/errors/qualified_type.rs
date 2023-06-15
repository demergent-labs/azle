use swc_ecma_ast::TsTypeRef;

use crate::{
    canister_method::AnnotatedFnDecl,
    errors::{CompilerOutput, Location},
    traits::GetSourceFileInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct QualifiedType {
    location: Location,
}

impl QualifiedType {
    pub fn from_annotated_fn_decl(
        annotated_fn_decl: &SourceMapped<AnnotatedFnDecl>,
        ts_type_ref: &TsTypeRef,
    ) -> Self {
        Self {
            location: annotated_fn_decl.source_map.get_location(ts_type_ref.span),
        }
    }

    fn build_qualified_type_error_msg(&self) -> CompilerOutput {
        CompilerOutput {
            title: "Namespace-qualified types are not currently supported".to_string(),
            location: self.location.clone(),
            annotation: "Namespace specified here".to_string(),
            suggestion: None, // This is caught first by src/compiler/typescript_to_rust/azle_generate/src/ts_ast/azle_type/azle_type_ref/errors.rs
        }
    }
}

impl std::error::Error for QualifiedType {}

impl From<QualifiedType> for crate::Error {
    fn from(error: QualifiedType) -> Self {
        Self::QualifiedType(error)
    }
}

impl std::fmt::Display for QualifiedType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.build_qualified_type_error_msg())
    }
}
